'use strict'

// テンプレにデータをセットする関数
function setAwardData(selecter, data) {
    selecter.find(".data-thumb").attr("style", `background-image: url("assets/img/app/${data.id}.png");`);
    selecter.find(".data-title").text(data.title);
    selecter.find(".data-page").attr("href", data.page);
    selecter.find(".data-name").text(data.name);
    selecter.find(".data-source").attr("href", data.source);
    selecter.find(".data-desc").text(data.desc);
}

// 受賞作品
setAwardData($(".nhigh.grand-prize"), datas.filter( e => e.category === "NS高等学校部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nhigh.first-place"), datas.filter( e => e.category === "NS高等学校部門" && e.award === "優秀賞")[0]);
setAwardData($(".nprog.grand-prize"), datas.filter( e => e.category === "N中等部部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nprep.grand-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "最優秀賞")[0]);
setAwardData($(".nprep.tech-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "技術賞")[0]);
setAwardData($(".nprep.move-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "動くで賞")[0]);
setAwardData($(".nprep.design-prize"), datas.filter( e => e.category === "N予備校部門" && e.award === "デザイン賞")[0]);

// 佳作一覧
const contentTemplate = $(".template"); // HTMLテンプレ部品を読込み
for (let data of datas.filter(e => e.award === "佳作")) { // 受賞作品以外でループ
    const content = contentTemplate.clone(true); // HTMLテンプレ部品をコピー
    setAwardData(content, data); // データをセット
    contentTemplate.after(content); // HTMLに追加
}
contentTemplate.hide(); // テンプレを非表示
