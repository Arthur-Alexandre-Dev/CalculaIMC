function Imc(age, weight, height) {
  this.age = age;
  this.weight = weight;
  this.height = height;
  this.imc_calculator = () => {
    let calculate_imc = this.weight / (this.height * this.height);
    return calculate_imc.toFixed(2);
  };
}

(function p1() {
  let p1 = new Imc(25, 80, 1.8);
  console.log(p1.imc_calculator());
})();
