FROM python:3.10
WORKDIR /code
COPY package.json ./code/package.json
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
# RUN npm install --silent
RUN pip install --upgrade firebase-admin
COPY ./ /code/
CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8000"]
# CMD ["npm", "start"]