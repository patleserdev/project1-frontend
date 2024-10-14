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
       ,{
        label:'image',
        field:'picture',
        type:'upload',
        comments:'permet d\'ajouter une image à l\'ingrédient',
        required:false,
        placeholder:''
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
        required:true,
        placeholder:'le nom'
       }
       ,{
        label:'unité',
        field:'unit',
        type:'string',
        required:true,
        placeholder:'l\'unité utilisée'
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
        required:true,
        placeholder:'le nom'
       }
       ,{
        label:'nombre de parts',
        field:'defaultServing',
        type:'range',
        min:1,
        max:12,
        default:4,
        required:true,
        placeholder:'',
        unit:''
       }
       ,{
        label:'ingrédients',
        field:'ingredients',
        type:'choice',
        comments:'choix des ingrédients dans une liste - restitution d\'un tableau contenant l\'ingrédient,la quantité et la mesure utilisée',
        placeholder:'les ingrédients'
       }
       ,{
        label:'Les étapes',
        field:'steps',
        type:'steps',
        comments:'permet d\'ajouter une ou plusieurs étapes, pouvoir ajouter une nouvelle étape dans le formulaire',
         placeholder:'le contenu de l\'étape'
       }
       ,{
        label:'image',
        field:'pictures',
        type:'upload',
        comment:'pouvoir ajouter une ou plusieurs images , stockées dans cloudinary',
         placeholder:''
       }
       ,{
        label:'temps de cuisson',
        field:'timeToCook',
        type:'range',
        min:0,
        max:300,
         placeholder:'',
         unit:'mn'
       }
       ,{
        label:'temps de préparation',
        field:'timeToPrepare',
        type:'range',
        min:0,
        max:300,
        placeholder:'',
        unit:'mn'
       }
       ,{
        label:'difficulté',
        field:'difficulty',
        type:'range',
        min:1,
        max:5,
         placeholder:'',
         unit:''
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
        required:true,
         placeholder:'le nom'
       }
       ,{
        label:'label dans l\'interface',
        field:'label',
        type:'string',
        required:true,
         placeholder:'le label dans l\'interface'
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
        required:true,
         placeholder:''
       }
       ,{
        label:'label dans l\'interface',
        field:'label',
        type:'string',
        required:true,
         placeholder:''
       }
       ,{
        label:'Type de régime ( allergie, croyance...)',
        field:'type',
        type:'string',
        placeholder:''
       }
    ]
  },
  ]