function buildCard() {
    let cardHeader1 = CardService.newCardHeader()
        .setTitle('Akash Shanmugaraj')
        .setSubtitle('akashshanmugaraj@gmail.com')
        .setImageUrl(
            'https://source.unsplash.com/featured/320x180?nature&sig=8')
        .setImageStyle(CardService.ImageStyle.CIRCLE);

    let cardSection1 = CardService.newCardSection();

    let cardSection2ButtonList1Button1Action1 = CardService.newAction()
        .setFunctionName('TODO')
        .setParameters({});

    let cardSection2ButtonList1Button1 = CardService.newTextButton()
        .setText('Start Relay')
        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
        .setOnClickAction(cardSection2ButtonList1Button1Action1);

    let cardSection2ButtonList1 = CardService.newButtonSet()
        .addButton(cardSection2ButtonList1Button1);

    let cardSection2ButtonList2Button1Action1 = CardService.newAction()
        .setFunctionName('TODO')
        .setParameters({});

    let cardSection2ButtonList2Button1 = CardService.newTextButton()
        .setText('Stop Relay')
        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
        .setOnClickAction(cardSection2ButtonList2Button1Action1);

    let cardSection2ButtonList2 = CardService.newButtonSet()
        .addButton(cardSection2ButtonList2Button1);

    let cardSection2 = CardService.newCardSection()
        .setHeader('Transmission Controls')
        .addWidget(cardSection2ButtonList1)
        .addWidget(cardSection2ButtonList2);

    let cardSection3ButtonList1Button1Action1 = CardService.newAction()
        .setFunctionName('TODO')
        .setParameters({});

    let cardSection3ButtonList1Button1 = CardService.newTextButton()
        .setText('Clear Relay')
        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
        .setOnClickAction(cardSection3ButtonList1Button1Action1);

    let cardSection3ButtonList1 = CardService.newButtonSet()
        .addButton(cardSection3ButtonList1Button1);

    let cardSection3 = CardService.newCardSection()
        .setHeader('Data Controls')
        .addWidget(cardSection3ButtonList1);

    let card = CardService.newCardBuilder()
        .setHeader(cardHeader1)
        .addSection(cardSection1)
        .addSection(cardSection2)
        .addSection(cardSection3)
        .build();
    return card;
}
