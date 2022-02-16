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
/*
setAwardData($(".nhigh.grand-prize"), datas.filter( e => e.category === "N・S高等学校部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nhigh.first-place"), datas.filter( e => e.category === "N・S高等学校部門" && e.award === "優秀賞")[0]);
setAwardData($(".nprog.grand-prize"), datas.filter( e => e.category === "N中等部部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nprep.grand-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nprep.tech-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "技能特別賞")[0]);
setAwardData($(".nprep.design-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "デザイン特別賞")[0]);
*/

// 全作品
const contentTemplate = $(".template");
const others = datas.filter( e => e.award === "" );
for (let data of others) { 
    const content = contentTemplate.clone(true);
    setAwardData(content, data);
    contentTemplate.after(content);
}
contentTemplate.hide();
