export class TransformerDataUtils {
  static removeSpaces(obj: Record<string, any>): void {
    Object.keys(obj).forEach(key => {
      if (key !== 'id' && key !== 'Title') {
        const newKey = key.replace(/\s/g, ''); // Supprimer les espaces de la clé
        const value = obj[key];
        delete obj[key];
        obj[newKey] = value;
      }
    });
  }
}
