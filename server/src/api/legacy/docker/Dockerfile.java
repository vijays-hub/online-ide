FROM openjdk:latest
WORKDIR /app
COPY . /app
CMD ["java", "Main"]
