import sys
import os
import glob
import re
import numpy as np
import tensorflow as tf
import tensorflow as tf

from tensorflow.compat.v1 import ConfigProto
from tensorflow.compat.v1 import InteractiveSession
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import load_model

config = ConfigProto()
config.gpu_options.per_process_gpu_memory_fraction = 0.2
config.gpu_options.allow_growth = True
session = InteractiveSession(config=config)
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask import Flask, redirect, url_for, request, render_template, jsonify
from werkzeug.utils import secure_filename
import tensorflow as tf
import urllib.request
# URL ของไฟล์น้ำหนักของ ResNet-50
url = 'https://github.com/keras-team/keras-applications/releases/download/resnet/resnet50_weights_tf_dim_ordering_tf_kernels.h5'
file_name = 'resnet50_weights_tf_dim_ordering_tf_kernels.h5'
urllib.request.urlretrieve(url, file_name)


# Define a flask app
app = Flask(__name__)


model = ResNet50(weights=None, input_shape=(150, 150, 3))  # ไม่โหลดน้ำหนักในตัวโมเดล

# Load the pretrained weights for ResNet-50
model.load_weights('resnet50_weights_tf_dim_ordering_tf_kernels.h5')

# Save the model to a file
model.save('model_resnet50v2.h5')

# Load the model from the file
loaded_model = load_model('model_resnet50v3.h5')

app.config['UPLOAD_FOLDER'] = 'C:\\Users\\Admin\\Downloads\\hfghgfhf\\minih5webtest\\uploads' 

class ImagePredictionResult:
    def __init__(self, label, confidence):
        self.label = label
        self.confidence = confidence

class_mapping = {
    0: "Brown Spot Disease",
    1: "Dirty Panicle Disease",
    2: "Narrow BrownSpot Disease",
    3: "Rice Blast Disease"
}

def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(150, 150))
    x = image.img_to_array(img)
    x = x / 255.0
    x = np.expand_dims(x, axis=0)
    preds = model.predict(x)
    label = np.argmax(preds)
    confidence = preds[0][label]
    return ImagePredictionResult(label, confidence)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            # Save the file to a temporary location
            temp_file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
            file.save(temp_file_path)
            prediction = model_predict(temp_file_path, loaded_model)
            if 0 <= prediction.label < len(class_mapping):
                predicted_class = class_mapping[prediction.label]
            else:
                predicted_class = 'Invalid Label'
            result = {
                'label': predicted_class,
                'confidence': float(prediction.confidence)  # แปลงเป็น float
            }
            return jsonify(result)
        return jsonify({'error': 'No file uploaded'})





if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
