import { readFile, utils } from 'xlsx';
import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

const readFileXSLX = readFile(`${__dirname}/data/brasil.xlsx` );
const sheetFile = readFileXSLX.Sheets['ESTRUTURA_BR']

const dataConvertedInJson = utils.sheet_to_json(sheetFile);


const widthPosition = () => {
  const x = lodash.random(-24, 24);
  return x;
};

let position = false;

const jsonFormatedData = dataConvertedInJson.map((data: any) => {
  position = !position;

  const dimensions = 
  [data.dimension_1,data.dimension_2,data.dimension_3,data.dimension_4,data.dimension_5]
  .filter((i) => i);

  let subcategories = [];

  if(data.categoryName === "Regulação"){
    subcategories.push(data.categoryRegulation_1,data.categoryRegulation_2,data.categoryRegulation_3,
      data.categoryRegulation_4,data.categoryRegulation_5);
    
  };

  if(data.categoryName === "Instituição"){
    subcategories.push(data.categoryInstituition_1,data.categoryInstituition_2,data.categoryInstituition_3
      ,data.categoryInstituition_4,data.categoryInstituition_5);
    
  };

  if(data.categoryName === "Participação"){
    subcategories.push(data.categoryParticipation_1,data.categoryParticipation_2,
    data.categoryParticipation_3,data.categoryParticipation_4,data.categoryParticipation_5)
  };

// CRIAR FUNÇÃO PARA DEFINIR CADA COR

  let numberMonth = 0;

  switch (true) {
    case data.month === 'janeiro' || data.month === 'Janeiro':
      numberMonth = 1
      break;

    case data.month === 'fevereiro' || data.month === 'Fevereiro':
      numberMonth = 2
      break;

    case data.month === 'março' || data.month === 'marco' || data.month === 'Março' || data.month === 'Marco':
      numberMonth = 3
      break;

    case data.month === 'abril' || data.month === 'Abril':
      numberMonth = 4
      break;   

    case data.month === 'maio' || data.month === 'Maio':
      numberMonth = 5
      break;

    case data.month === 'junho' || data.month === 'Junho':
      numberMonth = 6
      break;

    case data.month === 'julho' || data.month === 'Julho':
      numberMonth = 7
      break;

    case data.month === 'agosto' || data.month === 'Agosto':
      numberMonth = 8
      break;

    case data.month === 'setembro' || data.month === 'Setembro':
      numberMonth = 9
      break;

    case data.month === 'outubro' || data.month === 'Outubro':
      numberMonth = 10
      break;

    case data.month === 'novembro' || data.month === 'Novembro':
      numberMonth = 11
      break;

    case data.month === 'dezembro' || data.month === 'Dezembro':
      numberMonth = 12
      break;      
      
    default:
      break;
  }

  let qualification = '';

  const qualificationString = data.qualification.toString().toLowerCase();

  switch (true) {
    case qualificationString === 'positivo':
      qualification = 'positive'
      break;

   case qualificationString === 'negativo':
      qualification = 'negative'
      break;

  case qualificationString === 'baseline':
      qualification = 'baseline'
      break;      

  default:
      break;
  }
  
  const json = {
    id: uuidv4(),
    position: position,
    widthMovimentation: widthPosition(),
    date: {
      day: data.day,
      month: numberMonth,
      year: data.year
    },
    color: null, // verificar cada cor
    qualification: qualification,
    country: data.country,
    flag: null,// inserir icone da bandeira do país
    dimensions: dimensions,
    category: {
      name: data.categoryName === undefined || data.categoryName === '' || data.categoryName === null ? null : data.categoryName,
      icon: null, //setar icone
      subcategories: subcategories.filter((i: any) => i)
    },
    legalFramework: {
      legalInstrument: data.legalInstrument,
      title: data.title,
      descriptive: data.descriptive,
      synthesis: data.synthesis
    },
    downloadFile: data.downloadFile
  }

  return json
})

const stringfiedData = JSON.stringify(jsonFormatedData,null, 2);

writeFileSync(`${__dirname}/data/data.json`,stringfiedData);

console.log('Finished!')