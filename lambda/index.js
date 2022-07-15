const Alexa = require('ask-sdk-core'); //require()関数でAlexa Skills Kit SDKのパッケージに含まれる「alexa-sdk」を読み込み
var answer = [];

// リクエストハンドラーを定義
// 「...を開いて」と発話した時の処理
const LaunchRequestHandler = {
    canHandle(handlerInput) {　// ハンドラーが処理すべきリクエストであればtureを返す
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'; 
    },
    handle(handlerInput) {
        const repeat = '研究室適性検査をはじめるよ。二つの質問に答えてね。準備はいい？';
        const reprompt = '準備はいい？';
        answer.push(1);
        
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "Labrecommend"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg"
                    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        return handlerInput.responseBuilder // 以下responseBuilderオブジェクトの関数
            .speak(repeat) // 応答内容の文字列をセット
            .reprompt(reprompt) // Alexaからの質問にユーザーが応答しない場合の再プロンプトの文言をセット
            .getResponse(); // スキルインターフェースへの応答を生成して返す
    },
};

const FieldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'FieldIntent'; // インテント名
    },
    handle(handlerInput){
        //const field = handlerInput.requestEnvelope.request.intent.slots.menu.value;
        
        const repeat = 'タイプワンについて二つ質問するよ。「ある」か「ない」で答えてね。第一問、化石に興味がある？';
        const reprompt = '第一問、化石に興味がある？';
        answer[0]=0; 
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "FieldDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                    "nowQuestionInfo": {
                        "questionDt": "化石に興味がある？",
                        "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/%E5%8C%96%E7%9F%B3.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        
        //
        
        return handlerInput.responseBuilder // 以下responseBuilderオブジェクトの関数
            .speak(repeat) // 応答内容の文字列をセット
            .reprompt(reprompt) // Alexaからの質問にユーザーが応答しない場合の再プロンプトの文言をセット
            .getResponse(); // スキルインターフェースへの応答を生成して返す
 
    }
}

//はい
const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YesIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = '次の質問には「インドア派」か「アウトドア派」で答えてね。第二問、休日はインドア派、アウトドア派？';
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YesDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                        "nowQuestionInfo": {
                            "questionDt": "休日はインドア派、アウトドア派？",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/%E3%82%A4%E3%83%B3%E3%83%89%E3%82%A2%E3%82%A2%E3%82%A6%E3%83%88%E3%83%89%E3%82%A2.png"
                        }
                    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        if(answer[0]===0){
            answer[0]=2;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};

//イエス
const YestwoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YestwoIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には宮田先生の研究室をおすすめするよ。';
        

                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YestwoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                        "nowQuestionInfo": {
                            "questionDt": "宮田研究室だよ！",
                            "primaryText1": "",
                            "primaryText2": "",
                            "primaryText3": "",
                            "primaryText4": "",
                            "primaryText5": "興味のある人はぜひエネ環にきてね！ ",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/%E5%AE%AE%E7%94%B0%E5%85%88%E7%94%9F.png"
        }
    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        if(answer[0]===2){
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};
//野菜が好き
const YesthreeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YesthreeIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には大城先生の研究室をおすすめするよ。大城先生の研究室では介護ロボットなどのロボット開発、AIを使っての果物の成熟度についてプログラミングを使って研究するよ。大城先生は休日に絵をかいたりプログラミングの勉強をしているよ。芸術に興味があってプログラミングをしてみたい人は、是非エネ環にきてね。';
        
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YesthreeDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "",
                        "nowQuestionInfo": {
                            "questionDt": "大城研究室だよ！",
                            "primaryText1": "大城先生の研究室では介護ロボットなどのロボット開発、",
                            "primaryText2": "AIを使っての果物の成熟度をプログラミングを使って",
                            "primaryText3": "研究するよ。先生は休日に絵をかいたりプログラミングの",
                            "primaryText4": "勉強をしているよ。芸術に興味があってプログラミングに",
                            "primaryText5": "興味のある人は、是非エネ環にきてね。",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/%E5%A4%A7%E5%9F%8E%E5%85%88%E7%94%9F.png"
                        }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        
        if(answer[0]===3){    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};
//いいえ
const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NoIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = '次の質問には「イエス」か「ノー」で答えてね。第二問、ロボットが好き？';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                            "aplData": {
                            "skillName": "エネルギー環境工学コース",
                            "textName": "研究室紹介",
                            "secondtextName": "〜オープンキャンパスへようこそ〜",
                            "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                            "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                            "nowQuestionInfo": {
                                "questionDt": "ロボットが好き？",
                                "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/%E3%83%AD%E3%83%9C%E3%83%83%E3%83%88.png"
                            }
                        }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        if(answer[0]===0){
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("おい何やってんだよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};

//ノー
const NotwoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NotwoIntent'; // インテント名
    },
    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には倉田先生の研究室をおすすめするよ。倉田先生の研究室では動物の毛の模様のでき方や生物の進化についてなどの自然現象を数式で表現して、AIを用いて変化の流れを探求していく研究室だよ。倉田先生は、休日に化石収集や飼育している熱帯魚の世話やマリンスポーツをするよ。興味のある人は是非エネ環に来てね。';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NotwoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "",
                    "nowQuestionInfo": {
                        "questionDt": "倉田研だよ",
                        "primaryText1": "倉田先生の研究室では生物の進化についてのなどの",
                        "primaryText2": "自然現象を数式で表現して、AIを用いて変化の流れを",
                        "primaryText3": "探求していく研究室だよ。倉田先生は、休日に化石収集や",
                        "primaryText4": "飼育している熱帯魚の世話やマリンスポーツをするよ。",
                        "primaryText5": "興味のある人は是非エネ環に来てね。",
                        "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/%E5%80%89%E7%94%B0%E5%85%88%E7%94%9F.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        if(answer[0]===2){
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
        
    },
};


//肉が好き
const NothreeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NothreeIntent'; // インテント名
    },
    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には宮田先生の研究室をおすすめするよ。';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NothreeDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "",
                    "nowQuestionInfo": {
                        "questionDt": "宮田研究室だよ！",
                        "primaryText1": "",
                        "primaryText2": "",
                        "primaryText3": "",
                        "primaryText4": "",
                        "primaryText5": "興味のある人はぜひエネ環にきてね！ ",
                        "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/%E5%AE%AE%E7%94%B0%E5%85%88%E7%94%9F.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        if(answer[0]===3){    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
        
    },
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) { 
        const speechText = '研究室適性検査をはじめるよ。二つの質問に答えてね。';
        const reprompt = '準備はいい？';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            //.withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'エネ環に来てね！';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(speechText)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() { 
        return true; // errorハンドラーを1つだけ定義する場合は、戻り値を常にtureに設定する
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`); // handle()関数は第2引数にerrorオブジェクトを受け取る

        return handlerInput.responseBuilder
            .speak('うまく聞き取れませんでした。')
            .reprompt('もう一度お願いします。')
            .getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom(); // Alexa.SkillBuilders.custom()関数でスキルビルダーと呼ばれるオブジェクトを取得

exports.handler = skillBuilder 
    .addRequestHandlers( // 上で定義したハンドラーオブジェクトを渡す
        LaunchRequestHandler,
        FieldIntentHandler,
        YesIntentHandler,
        YestwoIntentHandler,
        NotwoIntentHandler,
        NoIntentHandler,
        NothreeIntentHandler,
        YesthreeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler) // エラーハンドラーオブジェクトを渡す
    .lambda(); //lambda関数を呼び出し、lambda関数ハンドラーを取得、そのままexports.handlerにセット