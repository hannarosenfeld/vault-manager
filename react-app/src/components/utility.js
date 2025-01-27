export function sortFields(fieldsArr) {
    return fieldsArr.sort(function (a, b) {
      const [, aAlpha, aNum] = a.name.match(/^([A-Za-z]+)(\d+)$/);
      const [, bAlpha, bNum] = b.name.match(/^([A-Za-z]+)(\d+)$/);
  
      if (aAlpha !== bAlpha) {
        return aAlpha.localeCompare(bAlpha);
      }
  
      return parseInt(aNum) - parseInt(bNum);
    });
  }