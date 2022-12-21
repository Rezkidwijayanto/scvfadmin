 

export class pagination { 
    createRange(number: any) {
            var items: number[] = [];
            for (var i = 1; i <= number; i++) {
              items.push(i);
            }  
            return items;
          } 
      
}