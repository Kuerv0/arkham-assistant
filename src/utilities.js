export function conversor(n, difficulty=2){
  let p = difficulty/6;

  let distribution = [];
  for (let x = 0; x <= n; x++){
    //calculate the probability of x successes in n trials with probability p
    let probability = (factorial(n) / (factorial(x) * factorial(n - x))) * (Math.pow(p, x)) * (Math.pow((1 - p), (n - x)));
    distribution.push(probability)
  }
  let result = "" 
  for (let i = 1; i <= n; i++){
    let sum =  0;
    for (let j = i; j <= n; j++){
      sum += distribution[j]
    }

    result += `exitos: ${i} probabilidad: ${Math.round(sum * 100)}<br/>`
  }

  return result;
}

function factorial(n) {
  if (n == 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
