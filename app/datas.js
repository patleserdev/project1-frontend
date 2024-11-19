export const datas=[
    {
    source:'ingredientscategories',
    label:'catégories d\'ingrédients',
    identifier:'id',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
        placeholder:'le nom',
        display:"true"
       }
       ,{
        label:'description',
        field:'description',
        type:'string',
        required:true,
        placeholder:'la description',
        display:"true"
       }
    ]
  },
  {
    source:'ingredients',
    label:'ingrédients',
    identifier:'id',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
        placeholder:'le nom',
        display:"true"
       }
       ,{
        label:'catégorie',
        field:'categorie',
        type:'entity',
        entity:'ingredientscategories',
        comments:'permet de choisir la catégories dans la liste de catégories',
        required:true,
        placeholder:'Choisir la catégorie',
        display:"true",
        valueinselect:'name',
        displayinselect:'name'
       }
       ,{
        label:'image',
        field:'picture',
        type:'upload',
        comments:'permet d\'ajouter une image à l\'ingrédient',
        required:false,
        placeholder:'',
        display:"true"
       }
    ]
  },
  {
    source:'mesures',
    label:'Mesures',
    identifier:'id',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
        placeholder:'le nom',
        display:"true"
       }
       ,{
        label:'unité',
        field:'unit',
        type:'string',
        required:true,
        placeholder:'l\'unité utilisée',
        display:"true"
       }
    ]
  },
  {
    source:'recipes',
    label:'recettes',
    identifier:'id',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
        placeholder:'le nom',
        display:"true"
       }
       ,{
        label:'nombre de parts',
        field:'defaultServing',
        type:'range',
        min:'1',
        max:'12',
        default:'4',
        required:true,
        placeholder:'',
        unit:'',
        display:"true"
       },{
        label:'Catégorie de recette',
        field:'recipeCategorie',
        type:'entity',
        entity:'recipescategories',
        comments:'choix des catégorie de recette - restitution d\'un tableau contenant les différentes catégoriees',
        placeholder:'la catégorie de recette',
        display:"true",
        required:true,
        valueinselect:'label',
        displayinselect:'label'
       }
       
       ,{
        label:'ingrédients',
        field:'ingredients',
        type:'entitychoice',
        entity:'ingredients',
        inputs:
        [
          {
            label:'ing',
            field :'ing',
            type:'entity',
            entity:'ingredients',
            required:true,
            placeholder:'l\'ingrédient',
            display:"true",
            valueinselect:'name',
            displayinselect:'name'
           },
           {
            label:'quantité',
            field :'quantity',
            type:'number',
            required:true,
            placeholder:'la quantité',
            display:"true"
           },
           {
            label:'mesure',
            field :'mesure',
            type:'subentity',
            entity:'mesures',
            required:true,
            placeholder:'la mesure',
            display:"true",
            valueinselect:"_id",
            displayinselect:"unit"
           }
        
        ],
        comments:'choix des ingrédients dans une liste - restitution d\'un tableau contenant l\'ingrédient,la quantité et la mesure utilisée',
        placeholder:'les ingrédients',
        display:"true",
        required:true,
        valueinselect:'name',
        displayinselect:'name'
       }
       ,{
        label:'Les étapes',
        field:'steps',
        type:'steps',
        comments:'permet d\'ajouter une ou plusieurs étapes, pouvoir ajouter une nouvelle étape dans le formulaire',
         placeholder:'le contenu de l\'étape',
         display:"true"
       }
       ,{
        label:'image',
        field:'pictures',
        type:'upload',
        comment:'pouvoir ajouter une ou plusieurs images , stockées dans cloudinary',
         placeholder:'',
         display:"true"
       }
       ,{
        label:'temps de cuisson',
        field:'timeToCook',
        type:'range',
        min:0,
        max:300,
         placeholder:'',
         unit:'mn',
         display:"true"
       }
       ,{
        label:'temps de préparation',
        field:'timeToPrepare',
        type:'range',
        min:0,
        max:300,
        placeholder:'',
        unit:'mn',
        display:"true"
       }
       ,{
        label:'difficulté',
        field:'difficulty',
        type:'range',
        min:1,
        max:5,
         placeholder:'',
         unit:'',
         display:"true"
       }
    ]
  },
  {
    
    source:'recipescategories',
    label:'catégories de recettes',
    identifier:'id',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
         placeholder:'le nom',
         display:"true"
       }
       ,{
        label:'label dans l\'interface',
        field:'label',
        type:'string',
        required:true,
         placeholder:'le label dans l\'interface',
         display:"true"
       }
    ]
  },
  {
    source:'regimes',
    label:'régime alimentaire',
    identifier:'id',
    inputs:
    [
      {
        label:'nom',
        field :'name',
        type:'string',
        required:true,
        placeholder:'',
        display:"true"
       }
       ,{
        label:'label dans l\'interface',
        field:'label',
        type:'string',
        required:true,
         placeholder:'',
         display:"true"
       }
       ,{
        label:'Type de régime ( allergie, croyance...)',
        field:'type',
        type:'choice',
        options:[{value:"allergie",label:"Allergie"},{value:"croyance",label:"Croyance"}],
        placeholder:'',
        display:"true"
       }
    ]
  },
  ]