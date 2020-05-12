import React from "react"
import {SelectButton} from "primereact/selectbutton";
import {InputSwitch} from "primereact/inputswitch";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {
    addAnnouncement,
    addAnnouncementDeprecated,
    changeView,
    clearAnnouncementForm,
    updateAnnoncementForm
} from "../../data-layer/ActionCreators";
import {generateUuid} from "../../util/uuid";
import {announcementView} from "../../Views";
import {GameTypes} from "../../data-layer/enums/GameType";
import {Sex} from "../../data-layer/enums/Sex";
import {createAnnouncement} from "../../util/HttpRequests";

const uploadUid = generateUuid()

function mapStateToProps(state) {
    return {
        announcementForm: state.announcementForm,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateAnnouncementForm: fieldNameToValue => dispatch(updateAnnoncementForm(fieldNameToValue)),
        clearAnnouncementForm: () => dispatch(clearAnnouncementForm()),
        addAnouncement: dto => dispatch(addAnnouncement(dto)),
        changeView: () => dispatch(changeView(announcementView))
    }
}

const gameTypeValues = [
    {label: "ЛС", value: GameTypes.LS.id},
    {label: "Конференция", value: GameTypes.CONFERENCE.id},
    {label: "Группа", value: GameTypes.GROUP.id}
]

const sexValues = [
    {label: "М", value: Sex.MALE.id},
    {label: "Ж", value: Sex.FEMALE.id}
]

function ConnectedAnnoucementCreation(props) {

    const {errors, register, handleSubmit} = useForm()

    function onSubmit() {
        createAnnouncement(
            props.announcementForm.title,
            props.announcementForm.gameType,
            props.announcementForm.sex,
            props.announcementForm.minAge,
            props.announcementForm.maxAge,
            props.announcementForm.description,
            props.announcementForm.anonymous,
            props.announcementForm.commentsEnabled,
            uploadUid,

            json => {
                props.addAnouncement(json)
                props.changeView()
                props.clearAnnouncementForm()
                props.growl.show({severity: "info", summary: "Объявление опубликовано"})
            }
        )
    }

    return (
        <div className={"p-grid p-dir-col announcement-creation-vertical"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"p-col"}>
                    <input placeholder={"Название:"}
                           name={"title"}
                           ref={register({required: true})}
                           value={props.announcementForm.title}
                           onChange={e => props.updateAnnouncementForm({title: e.target.value})}
                    />
                    <span className={"errors"}>
                    {errors.title && "Обязательное поле"}
                    </span>

                </div>
                <div className={"p-col"}>
                    <span>Тип игры: </span>
                </div>
                <div className={"p-col"}>
                    <SelectButton
                        name={"gameType"}
                        options={gameTypeValues}
                        value={props.announcementForm.gameType}
                        onChange={(e) => props.updateAnnouncementForm({gameType: e.target.value})}
                    />
                </div>
                <div className={"p-col"}>
                    <span>Пол персонажа:</span>
                </div>
                <div className={"p-col"}>
                    <SelectButton
                        name={"sex"}
                        options={sexValues}
                        value={props.announcementForm.sex}
                        onChange={(e) => props.updateAnnouncementForm({sex: e.target.value})}
                    />
                </div>
                <div className={"p-col"}>
                    <input placeholder={"Минимальный возраст персонажа"}
                           name={"minAge"}
                           value={props.announcementForm.minAge}
                           onChange={(e) => props.updateAnnouncementForm({minAge: e.target.value})}
                           ref={register({pattern: /^[0-9]*$/i})}
                    />
                    <span className={"errors"}>
                        {errors.minAge && "Поле должно быть цифрой"}
                    </span>
                </div>
                <div className={"p-col"}>
                    <input
                        placeholder={"Максимальный возраст персонажа"}
                        name={"maxAge"}
                        value={props.announcementForm.maxAge}
                        onChange={(e) => props.updateAnnouncementForm({maxAge: e.target.value})}
                        ref={register({pattern: /^[0-9]*$/i})}
                    />
                    <span className={"errors"}>
                    {errors.maxAge && "Поле должно быть цифрой"}
                    </span>
                </div>
                <div className={"p-col"}>
                    <span>Текст объявления:</span>
                </div>
                <div className={"p-col"}>
                    <textarea name={"description"}
                              value={props.announcementForm.description}
                              onChange={(e) => props.updateAnnouncementForm({description: e.target.value})}
                              ref={register({required: true})}
                    />
                    <span className={"errors"}>
                        {errors.description && "Обязательное поле"}
                    </span>
                </div>
                <div className={"p-col"}>
                    <span>Картинка к объявлению (не более 3):</span>
                </div>
                <div className={"p-col"}>
                    {/*<FileUpload name={"file1"}*/}
                    {/*            url={uploadUrl + "/" + uploadUid}*/}
                    {/*            mode={"basic"}*/}
                    {/*            auto={true}*/}
                    {/*            maxFileSize={262144}*/}
                    {/*            chooseLabel={"Выберите файл.."}*/}
                    {/*/>*/}
                </div>
                <div className={"p-col"}>
                    <div className={"p-grid p-dir-row"}>
                        <div className={"p-col"}>
                            Анонимно:
                        </div>
                        <div className={"p-col"}>
                            <InputSwitch checked={props.announcementForm.anonymous}
                                         onChange={(e) => props.updateAnnouncementForm({anonymous: e.value})}/>
                        </div>
                    </div>
                </div>
                <div className={"p-col"}>
                    <div className={"p-grid p-dir-row"}>
                        <div className={"p-col"}>
                            Комментарии:
                        </div>
                        <div className={"p-col"}>
                            <InputSwitch checked={props.announcementForm.commentsEnabled}
                                         onChange={(e) => props.updateAnnouncementForm({commentsEnabled: e.value})}/>
                        </div>
                    </div>
                </div>
                <div className={"p-col"}>
                    <input className={"submit-btn"} type={"submit"} value={"Сохранить"}/>
                </div>
            </form>
        </div>
    )
}

const AnnoucementCreation = connect(mapStateToProps, mapDispatchToProps)(ConnectedAnnoucementCreation)

export default AnnoucementCreation