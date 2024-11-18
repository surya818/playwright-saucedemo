export class Item {
    name: string;
    description: string;
    price: string;
    
  
    constructor(name: string, description: string,price: string) {
      this.price = price;
      this.name = name;
      this.description = description;
    }   

    logItem() {
        console.log('Item: Name: ' + this.name + '\r\n'+ 'Price: ' + this.price + '\r\n'+ 'Description  ' + this.description);      

  
    }
  }