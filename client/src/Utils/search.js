import unidecode from "unidecode";
export default function search(arr, keyword) {
    if(!keyword) return arr
    keyword = keyword.toString()
    return arr.filter(item => {
      let temp_item = {...item}
      if(item.type === 'Single') temp_item.type = 'Don'
      if(item.type === 'Double') temp_item.type = 'Doi'
      const values = Object.values(temp_item);
      for (let value of values) {
        if (unidecode(value.toString()).toLowerCase().includes(unidecode(keyword.toLowerCase()))) {
          return true;
        }
      }
      return false;
    });
  }
  