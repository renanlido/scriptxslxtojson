import { readFile, utils } from 'xlsx';
import { writeFileSync } from 'fs';

const readFileXSLX = readFile(`${__dirname}/data/arquivo.xlsx` );
const sheetFile = readFileXSLX.Sheets['ESTRUTURA_BR']

const dataConvertedInJson = utils.sheet_to_json(sheetFile);

const jsonFormatedData = dataConvertedInJson.map((data: any) => {

  const dimensions = 
  [data.dimension_1,data.dimension_2,data.dimension_3,data.dimension_4,data.dimension_5]
  .filter((i) => i);

  const subcategories = 
  [data.subCategory_1,data.subCategory_2,data.subCategory_3,data.subCategory_4,data.subCategory_5]
  .filter((i) => i);
  ;

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

  case qualificationString === 'basline':
      qualification = 'baseline'
      break;      

  default:
      break;
  }
  
  const json = {
    id: 0,
    position: false,
    widthMovimentation: 0,
    date: {
      day: data.day,
      month: numberMonth,
      year: data.year
    },
    color: null,
    qualification: qualification,
    country: data.country,
    dimensions: dimensions,
    category: {
      name: data.categoryName,
      icon: data.categoryIcon,
      subcategories: subcategories
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