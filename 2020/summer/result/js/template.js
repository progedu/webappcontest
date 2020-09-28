'use strict'

function setAwardData(selecter, category, award) {
    const data = datas.filter( e => e.category === category && e.award === award)[0];
    $(selecter + ".data-thumb").attr("style", `background-image: url("assets/img/applications/${data.id}.png");`);
    $(selecter + ".data-title").text(data.title);
    $(selecter + ".data-page").attr("href", data.page);
    $(selecter + ".data-source").attr("href", data.source);
    $(selecter + ".data-desc").text(data.desc);
}

// N高
setAwardData(".nhigh.grand-prize", "N高", "最優秀賞");
setAwardData(".nhigh.first-place", "N高", "優秀賞");
setAwardData(".nmiddle.grand-prize", "N中", "最優秀賞");
setAwardData(".nprep.grand-prize", "N予備校", "最優秀賞");

// 健闘賞
const contentTemplate = $(".template");

const kentos = datas.filter( e => e.award === "" );

for (let data of kentos) { 

    let content = contentTemplate.clone(true);
    content.find(".data-thumb").attr("style", `background-image: url("assets/img/applications/${data.id}.png");`);
    content.find(".data-title").text(data.title);
    content.find(".data-name").text(data.name);
    content.find(".data-page").attr("href", data.page);
    content.find(".data-source").attr("href", data.source);
    contentTemplate.after(content);

}
contentTemplate.hide();

