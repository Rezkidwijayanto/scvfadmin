export type Plant = {
    id:number | any;
    plant: string;
    kinaxis_plant: string;
    desc: string;
    typecnt: number;
    werks:string;
    idusin:string;
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  };
  export type PlantAcc = {
    userid:string;
    plant: string; 
    idusin:string;
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  };
  export type MstUsers = {
    id:number|any;
    userid:string;
    name: string; 
    plant:string;
    level:string;
    category:string;
    mail:string; 
    idusin:string;
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  }; 
  export type LoginLog = {
    id:number|any;
    act:number|any;
    desc:string;
    ipaddress: string; 
    userid:string; 
    idusin:string; 
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  };
  export type MstGAPLog = {
    id:number|any;
    plant:string;
    dtdataseq:string;
    filename:string;
    filename2: string;  
    idusin:string; 
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  };
  export type MstMaterialLog = {
    id:number|any;
    plant:string; 
    filename:string; 
    idusin:string; 
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  };
  export type MstVFlLog = {
    id:number|any;
    plant:string; 
    dtdataseq:string;
    filename:string; 
    idusin:string; 
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  };
  export type Training = {
    id:number|any;
    plant:string; 
    cat:string; 
    subjects:string;
    descs:string; 
    link:string; 
    trainer:string; 
    training_time:string;
    ex_level:string;  
    idusin:string; 
    idusup:string;
    ymd8in:Date;
    ymd8up:Date;
  };