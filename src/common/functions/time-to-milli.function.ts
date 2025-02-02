export function timeToMilli(time : string) : number {
  const lastChar = time.slice(-1);
  if(lastChar <= "9" && lastChar >= "0"){
    if(Number.isNaN(Number(time))){
      return 0;
    }
    return Number(time);
  }
  if(time.length < 2){
    return 0;
  }
  const timeString = time.substring(0, time.length - 1);
  if(Number.isNaN(Number(timeString))){
    return 0;
  }
  switch (lastChar) {
    case "s": {
      return  Number(timeString) * 1000;
    }
    case "m": {
      return Number(timeString) * 1000 * 60;

    }
    case "h": {
      return Number(timeString) * 1000 * 60 * 60;
    }
    case "d" : {
      return Number(timeString) * 1000 * 60 * 60 * 24;

    }
    case "w": {
      return Number(timeString) * 1000 * 60 * 60 * 24  * 7;

    }
    case "M": {
      return Number(timeString) * 1000 * 60 * 60 * 24  * 30;

    }
    case "y": {
      return  Number(timeString) * 1000 * 60 * 60 * 24  *  365;
    }
    default : {
      return 0;
    }
  }
}