const fetchPokemon = () => {
  const pokeInput = document.getElementById("pokeId");
  let pokeId = pokeInput.value;
  let pokeImg = document.getElementById("pokeImg");
  let pokeName = document.getElementById("pokeName");
  let pokeWeight = document.getElementById("pokeWeight");
  let pokeHeight = document.getElementById("pokeHeight");
  let pokemonTypes = JSON.parse(typesJson);
  let pokeTypes = document.getElementById("pokeTypes");
  let pokeHp = document.getElementById("bar1");
  let pokeAtk = document.getElementById("bar2");
  let pokeDef = document.getElementById("bar3");
  let pokeSa = document.getElementById("bar4");
  let pokeSd = document.getElementById("bar5");
  let pokeSpd = document.getElementById("bar6");
  let pokeMoves = document.getElementById("pokeMoves");

  //Resetea los campos cuando no se encuentra un pokemon
  function reset() {
    pokeWeight.innerHTML = "";
    pokeHeight.innerHTML = "";
    pokeMoves.innerHTML = "";
    pokeTypes.innerHTML = "";
    pokeHp.innerHTML = "";
    pokeDef.innerHTML = "";
    pokeAtk.innerHTML = "";
    pokeSa.innerHTML = "";
    pokeSd.innerHTML = "";
    pokeSpd.innerHTML = "";
  }

  pokeId = pokeId.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        console.log(res);
        reset();
        pokeImg.src = "img/pikachu-sad.png";
        pokeName.innerHTML = "Not found";
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        pokeImg.src = data.sprites.other["official-artwork"].front_default;
        pokeName.innerHTML = `#${data.id.pad(3)} - ${data.name.toUpperCase()}`;
        pokeWeight.innerHTML = `Weight: ${data.weight / 10}kg`;
        pokeHeight.innerHTML = `Height: ${data.height / 10}m`;
        pokeTypes.innerHTML = "";
        pokeMoves.innerHTML = "";
        data.types.map(
          (item) =>
            (pokeTypes.innerHTML +=
              "<img src=" +
              pokemonTypes[item.type.name] +
              " title=" +
              item.type.name +
              ">")
        );
        pokeHp.innerHTML = `<div class="inner-bar" title="${
          data.stats[0].base_stat
        }"style="height:${barPercent(data.stats[0].base_stat)}vmin;"></div>`;
        pokeAtk.innerHTML = `<div class="inner-bar" title="${
          data.stats[1].base_stat
        }"style="height:${barPercent(data.stats[1].base_stat)}vmin;"></div>`;
        pokeDef.innerHTML = `<div class="inner-bar" title="${
          data.stats[2].base_stat
        }"style="height:${barPercent(data.stats[2].base_stat)}vmin;"></div>`;
        pokeSa.innerHTML = `<div class="inner-bar" title="${
          data.stats[3].base_stat
        }"style="height:${barPercent(data.stats[3].base_stat)}vmin;"></div>`;
        pokeSd.innerHTML = `<div class="inner-bar" title="${
          data.stats[4].base_stat
        }"style="height:${barPercent(data.stats[4].base_stat)}vmin;"></div>`;
        pokeSpd.innerHTML = `<div class="inner-bar" title="${
          data.stats[5].base_stat
        }"style="height:${barPercent(data.stats[5].base_stat)}vmin;"></div>`;
        data.moves.map(
          (item) => (pokeMoves.innerHTML += `<li>${item.move.name}</li>`)
        );
      }
    });
};

// Calcular % de barra de stats
function barPercent(baseStat) {
  let statPercent = (baseStat * 100) / 255 / 10;
  return statPercent;
}

//Funcion para agregar 00 a los numeros menores que 100
Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

//Iconos de tipos de pokemon
typesJson =
  "{" +
  '"bug": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/120px-Pok%C3%A9mon_Bug_Type_Icon.svg.png",' +
  '"dark": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/120px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",' +
  '"dragon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/120px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png",' +
  '"electric": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/120px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",' +
  '"fairy": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/120px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png",' +
  '"fighting": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/120px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png",' +
  '"fire": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/120px-Pok%C3%A9mon_Fire_Type_Icon.svg.png",' +
  '"flying": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/120px-Pok%C3%A9mon_Flying_Type_Icon.svg.png",' +
  '"ghost": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/120px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png",' +
  '"grass": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/120px-Pok%C3%A9mon_Grass_Type_Icon.svg.png",' +
  '"ground": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/120px-Pok%C3%A9mon_Ground_Type_Icon.svg.png",' +
  '"ice": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/120px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",' +
  '"normal": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/120px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",' +
  '"poison": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/120px-Pok%C3%A9mon_Poison_Type_Icon.svg.png",' +
  '"psychic": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/120px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png",' +
  '"rock": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/120px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",' +
  '"steel": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/120px-Pok%C3%A9mon_Steel_Type_Icon.svg.png",' +
  '"water": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/120px-Pok%C3%A9mon_Water_Type_Icon.svg.png"' +
  "}";

/*for (let i = 0; i <= data.stats.length + 1; i++) {
          let pokeStat = document.getElementById(`bar${i + 1}`);
          let pokeStatP = barPercent(data.stats[i].base_stat);
          console.log(`stat ${pokeStatP}`); /*
          pokeStat.innerHTML = `<div class="inner-bar" styles="height:${barPercent(
            data.stats[i].base_stat
          )}"></div>`;*/
