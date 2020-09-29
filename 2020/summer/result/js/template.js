'use strict'

function setAwardData(selecter, data) {
    $(selecter + ".data-thumb").attr("style", `background-image: url("assets/img/applications/${data.id}.png");`);
    $(selecter + ".data-title").text(data.title);
    $(selecter + ".data-page").attr("href", data.page);
    $(selecter + ".data-name").text(data.name);
    $(selecter + ".data-source").attr("href", data.source);
    $(selecter + ".data-desc").text(data.desc);
}

// 受賞者
setAwardData(".nhigh.grand-prize", datas.filter( e => e.category === "N高" && e.award === "最優秀賞")[0]);
setAwardData(".nhigh.first-place", datas.filter( e => e.category === "N高" && e.award === "優秀賞")[0]);
setAwardData(".nmiddle.grand-prize", datas.filter( e => e.category === "N中" && e.award === "最優秀賞")[0]);
setAwardData(".nprep.grand-prize", datas.filter( e => e.category === "N予備校" && e.award === "最優秀賞")[0]);

// 健闘賞
const contentTemplate = $(".template");
const kentos = datas.filter( e => e.award === "" );
for (let data of kentos) { 

    const content = contentTemplate.clone(true);
    content.find(".data-thumb").attr("style", `background-image: url("assets/img/applications/${data.id}.png");`);
    content.find(".data-title").text(data.title);
    content.find(".data-page").attr("href", data.page);
    content.find(".data-name").text(data.name);
    content.find(".data-source").attr("href", data.source);
    content.find(".data-desc").text(data.desc);
    contentTemplate.after(content);
}
contentTemplate.hide();
