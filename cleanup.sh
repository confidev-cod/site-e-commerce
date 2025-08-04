#!/bin/bash
 
# Définir le répertoire cible
PROJECT_DIR=~/workspace/starter_project_react
 
# Supprimer tous les fichiers .DS_Store et *Zone.Identifier
find "$PROJECT_DIR" -type f \( -name ".DS_Store" -o -name "*Zone.Identifier" \) -exec rm -f {} \;
 
echo "✅ Suppression des fichiers .DS_Store et *Zone.Identifier terminée."
 
# Ajouter ces fichiers au .gitignore s'il existe, sinon le créer
GITIGNORE="$PROJECT_DIR/.gitignore"
 
if [ ! -f "$GITIGNORE" ]; then
    touch "$GITIGNORE"
fi
 
# Vérifier et ajouter les entrées si elles ne sont pas déjà présentes
grep -qxF '.DS_Store' "$GITIGNORE" || echo '.DS_Store' >> "$GITIGNORE"
grep -qxF '*Zone.Identifier' "$GITIGNORE" || echo '*Zone.Identifier' >> "$GITIGNORE"
 
echo "✅ Ajout des fichiers au .gitignore terminé."
 
# Vérifier si Git est initialisé, puis supprimer les fichiers déjà suivis
if [ -d "$PROJECT_DIR/.git" ]; then
    git -C "$PROJECT_DIR" rm --cached -r "*.DS_Store" "*Zone.Identifier" 2>/dev/null
    echo "✅ Suppression des fichiers du cache Git."
fi
 
echo "🎉 Nettoyage terminé !"