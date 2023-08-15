import { info } from 'console';
import { readFileSync, writeFileSync } from 'fs';

const formData = {
  "Choose your Male Representative": "Wade",
  "Choose your Female Representative": "Christina",
  "formid": "1zzB8xGjJcVpJrr-RpZsJU441-x6xcWE3V4SWXKifnpo"
};
const formID = formData.formid;
delete formData.formid;
const formDataKeys = Object.keys(formData)

var infodata = JSON.parse(readFileSync('./info.json', (err, data) => {return data;}));
console.log(infodata, formID, formDataKeys);

var formDatabase = {};
console.log()
if (infodata.available.includes(formID)) {
    formDatabase = JSON.parse(readFileSync(`./${formID}.json`, (err, data) => {return data;}));
    // console.log(formDatabase)
  for (var iterable = 0; iterable < formDataKeys.length; iterable++){
  
    // console.log(iterable, formDatabase[`question${iterable}`])
    formDatabase[`question${iterable}`]["choices"][formData[formDataKeys[iterable]]] += 1
  }
}
writeFileSync(`./${formID}.json`, JSON.stringify(formDatabase))