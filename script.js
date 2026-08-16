// Portfolio Halfaoui Ahmed — Architecte & ArchViz
// Thème clair/sombre, menu mobile, barre de progression, apparitions en
// cascade, parallaxe du dessin, envoi du formulaire vers Formspree

(function () {
  "use strict";

  var prefereReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Année du pied de page ----
  var annee = document.getElementById("annee");
  if (annee) annee.textContent = String(new Date().getFullYear());

  // ---- Bascule clair / sombre ----
  // Le changement passe par l'API View Transitions quand elle existe :
  // un seul fondu de page composé par le GPU, au lieu de dizaines de
  // transitions CSS désynchronisées.
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var racine = document.documentElement;
      var suivant = racine.dataset.theme === "sombre" ? "clair" : "sombre";

      var appliquer = function () {
        racine.dataset.theme = suivant;
        localStorage.setItem("theme", suivant);
        toggle.setAttribute(
          "aria-label",
          suivant === "sombre" ? "Basculer en mode clair" : "Basculer en mode sombre"
        );
      };

      var retirer = function () {
        racine.classList.remove("changement-theme");
      };

      racine.classList.add("changement-theme");

      if (document.startViewTransition && !prefereReduit) {
        document.startViewTransition(appliquer).finished.finally(retirer);
      } else {
        appliquer();
        setTimeout(retirer, 60);
      }
    });
  }

  // ---- Menu mobile ----
  var burger = document.querySelector(".nav-burger");
  var liens = document.querySelector(".nav-links");

  if (burger && liens) {
    burger.addEventListener("click", function () {
      var ouvert = liens.classList.toggle("ouvert");
      burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
      burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    });

    liens.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        liens.classList.remove("ouvert");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---- Barre de progression de lecture ----
  var progression = document.querySelector(".progression span");
  if (progression) {
    var majProgression = function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = total > 0 ? window.scrollY / total : 0;
      progression.style.transform = "scaleX(" + Math.min(Math.max(ratio, 0), 1) + ")";
    };
    window.addEventListener("scroll", majProgression, { passive: true });
    majProgression();
  }

  // ---- Parallaxe légère du dessin du héros ----
  var dessin = document.querySelector("[data-parallax]");
  if (dessin && !prefereReduit) {
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          dessin.style.transform = "translateY(" + y * 0.12 + "px)";
        }
      },
      { passive: true }
    );
  }

  // ---- Apparitions au défilement, en cascade dans les grilles ----
  document.querySelectorAll(".stagger").forEach(function (grille) {
    grille.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.setProperty("--delai", (i * 0.09).toFixed(2) + "s");
    });
  });

  var reveals = document.querySelectorAll(".reveal");

  if (prefereReduit || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var observateur = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (entree.isIntersecting) {
            entree.target.classList.add("visible");
            observateur.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach(function (el) { observateur.observe(el); });
  }

  // ---- Formulaire de contact (Formspree) ----
  var formulaire = document.getElementById("formulaire-contact");
  if (!formulaire) return;

  var statut = formulaire.querySelector(".form-statut");
  var bouton = formulaire.querySelector(".btn-envoyer");
  var texteBouton = bouton.querySelector("span");

  var caseConsentement = formulaire.querySelector("#consentement");
  if (caseConsentement) {
    caseConsentement.addEventListener("change", function () {
      caseConsentement.closest(".consentement").classList.remove("invalide");
    });
  }

  function afficherStatut(message, type) {
    statut.textContent = message;
    statut.classList.remove("succes", "erreur");
    if (type) statut.classList.add(type);
  }

  function validerChamps() {
    var valide = true;
    formulaire.querySelectorAll("[required]").forEach(function (champ) {
      if (champ.type === "checkbox") {
        champ.closest(".consentement").classList.toggle("invalide", !champ.checked);
        if (!champ.checked) valide = false;
        return;
      }
      var vide = !champ.value.trim();
      var emailInvalide = champ.type === "email" && champ.value.trim() && !champ.checkValidity();
      champ.classList.toggle("invalide", vide || emailInvalide);
      if (vide || emailInvalide) valide = false;
    });
    return valide;
  }

  // ---- Protection anti-spam : liens suspects connus ----
  // Raccourcisseurs et domaines fréquemment utilisés dans les messages
  // indésirables ; les URL du message sont comparées à cette liste.
  var DOMAINES_SUSPECTS = [
    "bit.ly", "tinyurl.com", "goo.gl", "t.co", "cutt.ly", "is.gd",
    "rb.gy", "shorturl.at", "ow.ly", "buff.ly", "t.ly", "v.gd",
    "clck.ru", "lnkiy.com", "u.to", "s.id", "tiny.cc", "qps.ru"
  ];

  var MOTIFS_SPAM = /(viagra|casino en ligne|crypto\s?invest|gagner de l'argent rapidement|seo backlinks|escort)/i;

  function detecterSpam() {
    var texte = [
      formulaire.querySelector("#message").value,
      formulaire.querySelector("#nom").value
    ].join(" ");

    // pot de miel rempli = robot
    var piege = formulaire.querySelector('[name="_gotcha"]');
    if (piege && piege.value.trim()) {
      return "Votre message n'a pas pu être envoyé.";
    }

    // extraction des liens du message
    var liens = texte.match(/https?:\/\/[^\s"'<>]+/gi) || [];

    if (liens.length > 3) {
      return "Trop de liens dans le message — merci d'en retirer et de réessayer.";
    }

    for (var i = 0; i < liens.length; i++) {
      var hote;
      try {
        hote = new URL(liens[i]).hostname.replace(/^www\./, "").toLowerCase();
      } catch (err) {
        continue;
      }
      var suspect = DOMAINES_SUSPECTS.some(function (domaine) {
        return hote === domaine || hote.endsWith("." + domaine);
      });
      if (suspect) {
        return "Un lien de votre message (" + hote + ") n'est pas accepté — merci d'utiliser un lien direct.";
      }
    }

    if (MOTIFS_SPAM.test(texte)) {
      return "Votre message a été détecté comme indésirable. Reformulez-le puis réessayez.";
    }

    return null;
  }

  formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validerChamps()) {
      afficherStatut("Merci de remplir les champs obligatoires et d'accepter la politique de confidentialité.", "erreur");
      return;
    }

    var motifSpam = detecterSpam();
    if (motifSpam) {
      afficherStatut(motifSpam, "erreur");
      return;
    }

    bouton.disabled = true;
    texteBouton.textContent = "Envoi en cours…";
    afficherStatut("", null);

    fetch(formulaire.action, {
      method: "POST",
      body: new FormData(formulaire),
      headers: { Accept: "application/json" }
    })
      .then(function (reponse) {
        if (reponse.ok) {
          formulaire.reset();
          afficherStatut("Message envoyé. Je vous réponds rapidement.", "succes");
        } else {
          return reponse.json().then(function (donnees) {
            var detail = donnees && donnees.errors
              ? donnees.errors.map(function (err) { return err.message; }).join(", ")
              : "réessayez dans un instant";
            afficherStatut("L'envoi a échoué (" + detail + ").", "erreur");
          });
        }
      })
      .catch(function () {
        afficherStatut("Connexion impossible. Vérifiez votre réseau puis réessayez.", "erreur");
      })
      .finally(function () {
        bouton.disabled = false;
        texteBouton.textContent = "Envoyer le message";
      });
  });
})();
