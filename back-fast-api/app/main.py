from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error
import pandas as pd
import joblib
import os

# Obtenir le chemin du répertoire courant
current_directory = os.getcwd()

# Chemin complet vers ton modèle
model_path = os.path.join(current_directory, "Decision_Tree.pkl")

# Charger le modèle
model = joblib.load(model_path)

# Vérifier si le fichier existe
if os.path.exists(model_path):
    print(f"Le modèle est bien trouvé à : {model_path}")
else:
    print(f"Le modèle n'a pas été trouvé à : {model_path}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FeaturesModel(BaseModel):
    holiday: str
    temp: float
    rain_1h: float
    snow_1h: float
    clouds_all: int
    weather_main: str
    weather_description: str
    day: str
    month: int
    year: int
    hour: int

@app.get("/")
async def read_root():
    return {"message": "Bienvenue sur FastAPI avec Docker !"}

@app.post("/coubeh")
async def test_model(features: FeaturesModel):
    try:
        input_data = pd.DataFrame([{
            "holiday": features.holiday,
            "temp": features.temp,
            "rain_1h": features.rain_1h,
            "snow_1h": features.snow_1h,
            "clouds_all": features.clouds_all,
            "weather_main": features.weather_main,
            "weather_description": features.weather_description,
            "day": features.day,
            "month": features.month,
            "year": features.year,
            "hour": features.hour
        }])
        print(f"Datas : {input_data}")
        # data = pd.DataFrame([{
        #     "holiday": None,
        #     "temp": 269.04,
        #     "hour": 13,
        #     "rain_1h": 0.0,
        #     "snow_1h": 0.0,
        #     "clouds_all": 90,
        #     "weather_main": "Clouds",
        #     "weather_description": "overcast clouds",
        #     "day": "Tuesday",
        #     "month": 11,
        #     "year": 2012,
        #         "hour": 13
        # }])

        prediction = model.predict(input_data)
        return {"prediction": prediction.tolist()[0]}
    except Exception as e:
        return {"error": f"{e}"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
