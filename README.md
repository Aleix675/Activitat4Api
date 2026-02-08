# API Activitat 4 – JDM Cars

## 🌐 Enllaç al projecte desplegat a Vercel
[https://activitat4-api.vercel.app](https://activitat4-api.vercel.app)

---

## 📝 Descripció
Aquesta és una API REST que permet gestionar cotxes JDM amb operacions CRUD (Crear, Llegir, Actualitzar, Esborrar).  
La base de dades està en MongoDB Atlas i la connexió es gestiona amb la variable d’entorn `MONGO_URI` a Vercel.

---

## 📂 Model de dades (MongoDB - Col·lecció `cars`)

| Camp       | Tipus   | Exemple          | Descripció                     |
|------------|--------|-----------------|--------------------------------|
| any        | Int    | 2020            | Any del vehicle                |
| dataAlta   | String | "2020-05-12"    | Data d’alta del vehicle        |
| marca      | String | "Toyota"        | Marca del cotxe                |
| model      | String | "Supra"         | Model del cotxe                |
| moneda     | String | "EUR"           | Moneda del preu                |
| origen     | String | "Japó"          | Origen del cotxe               |
| preu       | Int    | 45000           | Preu del vehicle               |
| tipus      | String | "Deportivo"     | Tipus de cotxe                 |
| traccio    | String | "RWD"           | Tracció del vehicle            |

---

## 🚀 Endpoints

| Mètode | Endpoint                  | On provar                   | Descripció |
|--------|---------------------------|----------------------------|------------|
| GET    | `/`                       | Navegador / Postman        | Ruta base, retorna missatge de funcionament de l’API |
| GET    | `/list`                   | Postman                   | Llista tots els cotxes disponibles |
| POST   | `/add`                     | Postman                   | Afegeix un nou cotxe. S’ha d’enviar un JSON al body |
| PUT    | `/update/:id`             | Postman                   | Actualitza un cotxe segons `_id`. JSON al body amb camps a modificar |
| DELETE | `/delete/:id`             | Postman                   | Esborra un cotxe segons `_id` |

---

## ⚙️ Exemple JSON per POST /add o PUT /update/:id

```json
{
  "any": 2020,
  "dataAlta": "1998-07-13",
  "marca": "Toyota",
  "model": "Supra",
  "moneda": "EUR",
  "origen": "Japon",
  "preu": 45000,
  "tipus": "Deportivo",
  "traccio": "RWD"
}
