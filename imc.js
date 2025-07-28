let selectedGender = null;

function Imc(age, weight, height) {
  this.age = age;
  this.weight = weight;
  this.height = height;

  this.imcCalculator = () => {
    let calculateImc = this.weight / ((this.height / 100) ** 2);
    return calculateImc.toFixed(2);
  };

  this.idealWeight = () => {
    let maleIdealWeight = 50 + 2.3 * ((this.height) - 154.4) / 2.54;
    let femaleIdealWeight = 45.5 + 2.3 * ((this.height) - 154.4) / 2.54;

    if (selectedGender === "male") {
      return maleIdealWeight.toFixed(2);
    } else if (selectedGender === "female") {
      return femaleIdealWeight.toFixed(2);
    }
    return null;
  };
}

function imcClassification(imc) {
  if (imc < 18.5) return "Magreza";
  if (imc < 24.9) return "Normal";
  if (imc < 29.9) return "Sobrepeso";
  if (imc < 39.9) return "Obesidade";
  return "Obesidade Grave";
}

document.querySelectorAll(".genderRadioBtn").forEach(label => {
  label.addEventListener("click", function () {
    const inputId = this.getAttribute("for");
    const input = document.getElementById(inputId);
    selectedGender = input.value;

    document.querySelectorAll(".genderRadioBtn").forEach(btn => {
      btn.classList.remove("selected");
    });

    this.classList.add("selected");
  });
});

document.querySelector(".bmiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = document.getElementById("age").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseInt(document.getElementById("height").value);

  const user = new Imc(age, weight, height);
  const imcValue = user.imcCalculator();
  const imcCategory = imcClassification(imcValue);
  const idealWeight = user.idealWeight();

  const checkedGender = document.querySelector('input[name="gender"]:checked');
  if (checkedGender) {
    selectedGender = checkedGender.value
  }

  if (!selectedGender) {
    alert("Por favor, selecione o sexo.");
    return;
  }

  if (weight <= 0 || height <= 0 || weight === isNaN || height === isNaN) {
    alert("Por favor, preencha a altura e o peso com valores válidos!")
    return;
  }

  const resultSection = document.querySelector(".result");
  resultSection.innerHTML = `
    <h3>Resultado</h3>
    <p>Seu IMC é ${imcValue} - ${imcCategory}</p>
    <p>Seu peso ideal para sua altura é: ${idealWeight} kg</p>
  `;
});
