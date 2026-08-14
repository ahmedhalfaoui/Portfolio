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
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var racine = document.documentElement;
      var suivant = racine.dataset.theme === "sombre" ? "clair" : "sombre";
      racine.dataset.theme = suivant;
      localStorage.setItem("theme", suivant);
      toggle.setAttribute(
        "aria-label",
        suivant === "sombre" ? "Basculer en mode clair" : "Basculer en mode sombre"
      );
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

  function afficherStatut(message, type) {
    statut.textContent = message;
    statut.classList.remove("succes", "erreur");
    if (type) statut.classList.add(type);
  }

  function validerChamps() {
    var valide = true;
    formulaire.querySelectorAll("[required]").forEach(function (champ) {
      var vide = !champ.value.trim();
      var emailInvalide = champ.type === "email" && champ.value.trim() && !champ.checkValidity();
      champ.classList.toggle("invalide", vide || emailInvalide);
      if (vide || emailInvalide) valide = false;
    });
    return valide;
  }

  formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validerChamps()) {
      afficherStatut("Merci de remplir les champs obligatoires (nom, email et message).", "erreur");
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
