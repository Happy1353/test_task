import React, { useState } from "react";
import { SafeAreaView, View, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import * as ImagePicker from 'react-native-image-picker';

import { errors_form, errors_type, success_form } from "../../utils/errors";

export const Task3 = () => {
    const [image, setImage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const imagePickerOptions: ImagePicker.ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.5,
    };

    const handleSubmit = () => {
        if (!image) {
            Alert.alert(errors_type.ERROR, errors_form.INVALID_IMG);
        } else if (!name.match(/^[\u0400-\u04FF]+$/)) {
            Alert.alert(errors_type.ERROR, errors_form.INVALID_NAME);
        } else if (description.length < 10) {
            Alert.alert(errors_type.ERROR, errors_form.INVALID_DESCRIPTION);
        } else {
            //Логика отправки на сервер
            Alert.alert(errors_type.SUCCESS, success_form);
        }
    };

    // Функция для выбора изображения из галереи
    const handleChooseImage = () => {
        ImagePicker.launchImageLibrary(imagePickerOptions, response => {
            if (response) {
                if (response.didCancel) {
                    console.error('User cancelled image picker');
                } else if (response.assets && response.assets.length > 0) {
                    setImage(response.assets[0].uri || ''); // Проверяем, что uri не undefined перед установкой
                }
            } else {
                console.error('Response is undefined');
            }
        });
    };

    // Обработчики изменения полей ввода
    const handleNameChange = (text: string) => {
        setName(text);
    };

    const handleDescriptionChange = (text: string) => {
        setDescription(text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Button title="Выбрать картинку" onPress={handleChooseImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <TextInput
                    placeholder="Имя"
                    value={name}
                    onChangeText={handleNameChange}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Описание"
                    value={description}
                    onChangeText={handleDescriptionChange}
                    style={styles.input}
                    multiline
                />
                <Button title="Отправить" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    image: {
        height: 200,
        marginBottom: 10,
        borderRadius: 5,
    },
});
