export class Utils {
  public static toPascalCase(value: string): string {
    let words = value.split('_');
    let finalWord = '';
    words.forEach(word => {
      finalWord +=
        word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
    });
    return finalWord;
  }

  public static getDatePart(date:Date){
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
}
