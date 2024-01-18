# Projet SAE5A01

## Description
Le projet SAE5A01 vise à développer une application mobile multi-plateforme de suivi des traitements médicamenteux et de leurs possibles effets secondaires ou interactions risquées pour les patients. L'application doit permettre une gestion efficace du régime médicamenteux chez le patient, avec déclaration aux autorités en cas d’effet(s) indésirable(s).
.

## Fonctionnalités clés

1. Enregistrement de l’ordonnance 	
OCR et Auto-complétion:
Lors de l'enregistrement de l'ordonnance, une interface d'auto-complétion est disponible, permettant à l'utilisateur de sélectionner le médicament en fonction des informations qu'il a préalablement remplies dans le champ dédié au nom du médicament. Un bouton intégré à l'application offre à l'utilisateur la possibilité d'utiliser une technologie OCR (Reconnaissance Optique de Caractères). Cette fonctionnalité permet d'importer une image existante ou de capturer une nouvelle image, puis automatise le remplissage des champs d'enregistrement de l'ordonnance en extrayant les informations textuelles pertinentes.


2. Accompagnement de la prise de médicament
Calendrier et notification:
Lorsque l'utilisateur a saisi un traitement composé de plusieurs médicaments, un calendrier est automatiquement généré pour lui permettre de visualiser les prochaines prises de médicaments. En se basant sur le calendrier, notre système de notification envoie des rappels à l'utilisateur aux moments prévus pour la prise de son traitement. Ces notifications dirigent ensuite l'utilisateur vers le calendrier correspondant, où il peut valider la prise de son traitement.


3. Flexibilité et douceure
Préférences utilisateurs et changement de profil
Afin de faciliter l'utilisation de notre application au sein des familles, nous avons introduit un système de profils. Chaque membre de la famille peut créer et gérer son propre espace, incluant la gestion personnalisée de ses traitements, avec la possibilité de visualiser également les traitements des autres membres. Pour renforcer l'identification visuelle, nous offrons la possibilité aux utilisateurs de définir leur propre image de profil. Dans la section des paramètres, les utilisateurs peuvent également spécifier l'heure de leur première et dernière prise de médicament. Ceci permet d'adapter les rappels de prise de médicament à leur routine quotidienne.

4. Sécuritée
Mot de passe et utilisation des données
Toutes les données de l'application demeurent internes, sans aucune sortie, sauf pour la liste des médicaments vendus en France, qui est une donnée entrante. Pour renforcer la sécurité, l'utilisateur a la possibilité d'activer l'utilisation d'un mot de passe à chaque accès de l'application.

5. Génération de rapport
Envoie de mail et génération de rapport
Lorsque le patient valide la prise d'un médicament via le calendrier, l'application stocke cette information en mémoire. Grâce à cette collecte de données, l'application offre à l'utilisateur la possibilité de générer un rapport au format PDF sur la prise des médicaments pour un traitement spécifique. Avant l'envoi automatique au médecin de référence du patient, le rapport peut être prévisualisé pour assurer son exactitude et sa pertinence.




## Instalation

Pour tester le projet merci de suivre ces instructions.

1. **Suivre la documentation React Native** https://reactnative.dev/docs/environment-setup?guide=native (Windows Android)
2. **Cloner le projet** git clone https://gitlab.univ-nantes.fr/E217817H/sae5a01.git
3. **Se déplacer dans le dossier MedSpace** cd MedSpace
4. **Lancer le project** npm run android et appuyer sur a
## Technologies utilisées

- React-Native -> Metro
- TypeScript
- GOLANG
- Mongo
- Sqlite


## Équipe de projet


- **Développeurs :**
  - Romain Gouraud romain.gouraud@etu.univ-nantes.fr
  - Nathan Ferry nathan.ferry@etu.univ-nantes.fr
  - Mathys Meunier mathys.meunier@etu.univ-nantes.fr


