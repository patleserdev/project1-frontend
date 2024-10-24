# Projet pédagogique afin de générer des formulaires dynamiques basés sur un fichier de structure

## Fonctionnalités
+ Affichage de pages contenant des formulaires différents basés sur le même composant Form
+ Génération de l'objet formData de sortie pour envoyer au back ok
+ Gère différents inputs dont un système d'étapes => output []
+ Ajout d'images également pour ingrédients et recettes
+ Backend Express.js et base de données MongoDB géré en mongoose
+ Gestion des mesures, ingrédients, régimes, catégories de recettes, catégories d'ingrédients ...
+ Utilisation du même tableau de structure pour afficher le tableau des données en frontend

## Exemple de structure : 
```
export const datas=[
    {
    source:'ingredientscategories',
    label:'catégories d\'ingrédients',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
        placeholder:'le nom'
       }
       ,{
        label:'description',
        field:'description',
        type:'string',
        required:true,
        placeholder:'la description'
       }
    ]
  },
  {
    source:'ingredients',
    label:'ingrédients',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
        placeholder:'le nom'
       }
       ,{
        label:'catégorie',
        field:'categorie',
        type:'entity',
        entity:'ingredientscategories',
        comments:'permet de choisir la catégories dans la liste de catégories',
        required:true,
        placeholder:''
       }
    ]

}
]
```

## Fonctionnalités suivantes
+ fetch post des datas
+ ajout d'images
+ Création d'un front utilisateur
+ Ajout d'un système d'authentification Google et classique mail.
+ Upgrade du système de formulaire ( j'ai une version plus avancée sur le projet Blog)
