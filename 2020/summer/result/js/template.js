'use strict'

function setAwardData(selecter, data) {
    selecter.find(".data-thumb").attr("style", `background-image: url("assets/img/applications/${data.id}.png");`);
    selecter.find(".data-title").text(data.title);
    selecter.find(".data-page").attr("href", data.page);
    selecter.find(".data-name").text(data.name);
    selecter.find(".data-source").attr("href", data.source);
    selecter.find(".data-desc").text(data.desc);
}

// 受賞者
setAwardData($(".nhigh.grand-prize"), datas.filter( e => e.category === "N高" && e.award === "最優秀賞")[0]);
setAwardData($(".nhigh.first-place"), datas.filter( e => e.category === "N高" && e.award === "優秀賞")[0]);
setAwardData($(".nmiddle.grand-prize"), datas.filter( e => e.category === "N中" && e.award === "最優秀賞")[0]);
setAwardData($(".nprep.grand-prize"), datas.filter( e => e.category === "N予備校" && e.award === "最優秀賞")[0]);

// 健闘賞
const contentTemplate = $(".template");
const kentos = datas.filter( e => e.award === "" );
for (let data of kentos) { 
    const content = contentTemplate.clone(true);
    setAwardData(content, data);
    contentTemplate.after(content);
}
contentTemplate.hide();
