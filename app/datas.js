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
        required:true
       }
       ,{
        label:'description',
        field:'description',
        type:'string',
        required:true
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
        required:true
       }
       ,{
        label:'catégorie',
        field:'categorie',
        type:'entity',
        entity:'ingredientscategories',
        comments:'permet de choisir la catégories dans la liste de catégories',
        required:true
       }
       ,{
        label:'image',
        field:'picture',
        type:'upload',
        comments:'permet d\'ajouter une image à l\'ingrédient',
        required:false
       }
    ]
  },
  {
    source:'mesures',
    label:'Mesures',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true
       }
       ,{
        label:'unité',
        field:'unit',
        type:'string',
        required:true
       }
    ]
  },
  {
    source:'recipes',
    label:'recettes',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true
       }
       ,{
        label:'nombre de parts',
        field:'defaultServing',
        type:'range',
        required:true
       }
       ,{
        label:'ingrédients',
        field:'ingredients',
        type:'choice',
        comments:'choix des ingrédients dans une liste - restitution d\'un tableau contenant l\'ingrédient,la quantité et la mesure utilisée'
       }
       ,{
        label:'ajouter une étape',
        field:'steps',
        type:'text',
        comments:'permet d\'ajouter une ou plusieurs étapes, pouvoir ajouter une nouvelle étape dans le formulaire'
       }
       ,{
        label:'image',
        field:'pictures',
        type:'upload',
        comment:'pouvoir ajouter une ou plusieurs images , stockées dans cloudinary'
       }
       ,{
        label:'temps de cuisson',
        field:'timeToCook',
        type:'range',
        min:0,
        max:300
       }
       ,{
        label:'temps de préparation',
        field:'timeToPrepare',
        type:'range',
        min:0,
        max:300
       }
       ,{
        label:'difficulté',
        field:'difficulty',
        type:'range',
        min:1,
        max:5
       }
    ]
  },
  {
    source:'recipescategories',
    label:'catégories de recettes',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true
       }
       ,{
        label:'label dans l\'interface',
        field:'label',
        type:'string',
        required:true
       }
    ]
  },
  {
    source:'regimes',
    label:'régime alimentaire',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true
       }
       ,{
        label:'label dans l\'interface',
        field:'label',
        type:'string',
        required:true
       }
       ,{
        label:'Type de régime ( allergie, croyance...)',
        field:'type',
        type:'string',
       }
    ]
  },
  ]