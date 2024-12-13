import React, { useEffect, useState } from "react";
import './App.css'; // Import du fichier CSS

function App() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    holiday: "",
    temp: "",
    rain_1h: "",
    snow_1h: "",
    clouds_all: "",
    weather_main: "",
    weather_description: "",
    day: "",
    month: "",
    year: "",
    hour: "",
  });

  const [errors, setErrors] = useState({
    holiday: "",
    temp: "",
    rain_1h: "",
    snow_1h: "",
    clouds_all: "",
    weather_main: "",
    weather_description: "",
    day: "",
    month: "",
    year: "",
    hour: "",
  });

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Vérification des champs vides
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Ce champ est requis";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleFetch();
      console.log("Données soumises : ", formData);
    } else {
      console.log("Formulaire invalide");
    }
  };

  const handleFetch = () => {
    fetch("http://localhost:8000/coubeh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.prediction));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="app-container">
      <p className="message">{message}</p>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="holiday">Vacances:</label>
          <input
            type="text"
            id="holiday"
            name="holiday"
            value={formData.holiday}
            onChange={handleChange}
          />
          {errors.holiday && <span className="error">{errors.holiday}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="temp">Température (°C):</label>
          <input
            type="number"
            id="temp"
            name="temp"
            value={formData.temp}
            onChange={handleChange}
          />
          {errors.temp && <span className="error">{errors.temp}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="rain_1h">Pluie (1h):</label>
          <input
            type="number"
            id="rain_1h"
            name="rain_1h"
            value={formData.rain_1h}
            onChange={handleChange}
          />
          {errors.rain_1h && <span className="error">{errors.rain_1h}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="snow_1h">Neige (1h):</label>
          <input
            type="number"
            id="snow_1h"
            name="snow_1h"
            value={formData.snow_1h}
            onChange={handleChange}
          />
          {errors.snow_1h && <span className="error">{errors.snow_1h}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="clouds_all">Nuages (%):</label>
          <input
            type="number"
            id="clouds_all"
            name="clouds_all"
            value={formData.clouds_all}
            onChange={handleChange}
          />
          {errors.clouds_all && <span className="error">{errors.clouds_all}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="weather_main">Temps (Principal):</label>
          <input
            type="text"
            id="weather_main"
            name="weather_main"
            value={formData.weather_main}
            onChange={handleChange}
          />
          {errors.weather_main && <span className="error">{errors.weather_main}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="weather_description">Temps (Description):</label>
          <input
            type="text"
            id="weather_description"
            name="weather_description"
            value={formData.weather_description}
            onChange={handleChange}
          />
          {errors.weather_description && <span className="error">{errors.weather_description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="day">Jour:</label>
          <input
            type="text"
            id="day"
            name="day"
            value={formData.day}
            onChange={handleChange}
          />
          {errors.day && <span className="error">{errors.day}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="month">Mois:</label>
          <input
            type="number"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
          />
          {errors.month && <span className="error">{errors.month}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="year">Année:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          {errors.year && <span className="error">{errors.year}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hour">Heure:</label>
          <input
            type="number"
            id="hour"
            name="hour"
            value={formData.hour}
            onChange={handleChange}
          />
          {errors.hour && <span className="error">{errors.hour}</span>}
        </div>

        <button type="submit" className="submit-btn">Soumettre</button>
      </form>
    </div>
  );
}

export default App;
