//=============================================================================
// RPGツクールMZ - LL_MenuScreenCustom.js v1.1.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc メニュー画面レイアウトをカスタマイズします。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-menuscreencustom/
 * @base LL_MenuScreenBase
 * @orderAfter LL_MenuScreenBase
 *
 * @help LL_MenuScreenCustom.js
 *
 * メニュー画面レイアウトをカスタマイズします。
 * 顔グラフィックの代わりに立ち絵を表示することもできます。
 * ※表示する立ち絵リストは「LL_MenuScreenBase」で設定してください。
 *
 * 立ち絵が上手く表示されない場合:
 *   何も表示されない場合は、X・Y座標始点のマイナス値を大きくしてみるか、
 *   拡大率を小さくしてみてください。
 *   顔グラフィックが表示されている時は、立ち絵リストが紐づけできていません。
 *   立ち絵リストが正しく設定されているか確認してみてください。
 *
 * ヘルプウィンドウ:
 *   ヘルプウィンドウの左上と右上に任意の情報を表示できます。
 *   表示する内容（値）はスクリプトで記述してください。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2020/12/08
 *
 * @param leftInputMode
 * @text メニューを左に配置
 * @desc メニューを左に配置し、タッチUI配置も左向けに調整します。
 * 戻るボタンが左上、ページ切替ボタンが右上に配置されます。
 * @default false
 * @type boolean
 *
 * @param numVisibleRows
 * @text アクター行数
 * @desc アクター一覧画面の行数です。 (推奨値: 1～2)
 * @default 2
 * @min 1
 * @max 10
 * @type number
 *
 * @param maxCols
 * @text アクター列数
 * @desc アクター一覧画面の列数です。 (推奨値: 1～2)
 * @default 2
 * @min 1
 * @max 10
 * @type number
 *
 * @param layoutSettings
 * @text 表示位置の設定
 * @desc ※この項目は使用しません
 *
 * @param actorNameLH
 * @text アクター名表示位置
 * @desc アクター名を上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 0)
 * @default 0
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorLevelLH
 * @text レベル表示位置
 * @desc レベルを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 1)
 * @default 1
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorIconLH
 * @text ステートアイコン表示位置
 * @desc ステートアイコンを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 2)
 * @default 2
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorClassLH
 * @text 職業名表示位置
 * @desc 職業名を上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 3)
 * @default 3
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorGaugeLH
 * @text ゲージ表示位置
 * @desc HP・MP・TPゲージを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 4)
 * @default 4
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param lvPadding
 * @text Lvの余白調整値
 * @desc Lv表記の余白調整値です。
 * 数値を小さくすると余白が狭くなります。 (初期値: 84)
 * @default 84
 * @min 0
 * @max 2000
 * @type number
 * @parent layoutSettings
 *
 * @param pictureSettings
 * @text 立ち絵表示の設定
 * @desc ※この項目は使用しません
 *
 * @param menuWindowPictureX
 * @text X座標始点
 * @desc 顔グラフィックの代わりに表示する立ち絵の表示位置(X)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuWindowPictureY
 * @text Y座標始点
 * @desc 顔グラフィックの代わりに表示する立ち絵の表示位置(Y)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuWindowPictureScale
 * @text 拡大率
 * @desc 立ち絵の拡大率です。 (初期値: 100)
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuHelpSettings
 * @text ヘルプウィンドウの設定
 * @desc ※この項目は使用しません
 *
 * @param menuHelpWindowEnable
 * @text ヘルプウィンドウを表示
 * @desc メニュー画面上部にヘルプウィンドウを表示します。
 * @default true
 * @type boolean
 * @parent menuHelpSettings
 *
 * @param menuHelpTexts
 * @text メニュー説明文
 * @desc メニュー説明文のリストを定義します。
 * @default ["{\"symbol\":\"アイテム\",\"helpText\":\"入手したアイテムを使用します。\"}","{\"symbol\":\"スキル\",\"helpText\":\"習得したスキルを使用します。\"}","{\"symbol\":\"装備\",\"helpText\":\"装備を変更します。\"}","{\"symbol\":\"ステータス\",\"helpText\":\"ステータスを確認します。\"}","{\"symbol\":\"並び替え\",\"helpText\":\"パーティの並び順を変更します。\"}","{\"symbol\":\"オプション\",\"helpText\":\"オプション画面を開きます。\"}","{\"symbol\":\"セーブ\",\"helpText\":\"これまでのデータをセーブします。\"}","{\"symbol\":\"ゲーム終了\",\"helpText\":\"ゲームを終了します。\"}"]
 * @type struct<menuHelpTexts>[]
 * @parent menuHelpSettings
 *
 * @param leftBlockLabel
 * @text 左上の項目名
 * @desc 左上に表示する項目名です。
 * 空白にすると非表示になります。
 * @default 現在地：
 * @type string
 * @parent menuHelpSettings
 *
 * @param leftBlockValue
 * @text 左上の値
 * @desc 左上に表示する値をスクリプトで記述します。
 * @default $gameMap.displayName()
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param leftBlockAlign
 * @text 左上の文字揃え
 * @desc 左上に表示する値の文字配置を選択します。
 * @default left
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 *
 * @param rightBlockLabel
 * @text 右上の項目名
 * @desc 右上に表示する項目名です。
 * 空白にすると非表示になります。
 * @default プレイ時間：
 * @type string
 * @parent menuHelpSettings
 *
 * @param rightBlockValue
 * @text 右上の値
 * @desc 右上に表示する値をスクリプトで記述します。
 * @default $gameSystem.playtimeText()
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param rightBlockAlign
 * @text 右上の文字揃え
 * @desc 右上に表示する値の文字配置を選択します。
 * @default right
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 */

/*~struct~menuHelpTexts:
 *
 * @param symbol
 * @text メニュー名
 * @desc メニュー名を入力します。
 * @type string
 *
 * @param helpText
 * @text メニュー説明文
 * @desc メニューの説明文を入力します。
 * @type string
 */

(() => {
  "use strict";
  const pluginName = "LL_MenuScreenCustom";

  const parameters = PluginManager.parameters(pluginName);
  const leftInputMode = eval(parameters["leftInputMode"] || "true");
  const numVisibleRows = Number(parameters["numVisibleRows"] || 2);
  const maxCols = Number(parameters["maxCols"] || 2);
  // 表示位置の設定
  const actorNameLH = Number(parameters["actorNameLH"] || 0);
  const actorLevelLH = Number(parameters["actorLevelLH"] || 1);
  const actorIconLH = Number(parameters["actorIconLH"] || 2);
  const actorClassLH = Number(parameters["actorClassLH"] || 3);
  const actorGaugeLH = Number(parameters["actorGaugeLH"] || 4);
  const lvPadding = Number(parameters["lvPadding"] || 84);
  // 立ち絵表示の設定
  const menuWindowPictureX = Number(parameters["menuWindowPictureX"] || 0);
  const menuWindowPictureY = Number(parameters["menuWindowPictureY"] || 0);
  const menuWindowPictureScale = Number(
    parameters["menuWindowPictureScale"] || 100
  );
  // ヘルプウィンドウの設定
  const menuHelpWindowEnable = eval(
    parameters["menuHelpWindowEnable"] || "true"
  );
  const menuHelpTexts = JSON.parse(parameters["menuHelpTexts"] || "null");
  const leftBlockLabel = String(parameters["leftBlockLabel"] || "");
  const leftBlockValue = String(parameters["leftBlockValue"] || "");
  const leftBlockAlign = String(parameters["leftBlockAlign"] || "left");
  const rightBlockLabel = String(parameters["rightBlockLabel"] || "");
  const rightBlockValue = String(parameters["rightBlockValue"] || "");
  const rightBlockAlign = String(parameters["rightBlockAlign"] || "right");

  let menuHelpLists = [];
  if (menuHelpTexts) {
    menuHelpTexts.forEach((elm) => {
      menuHelpLists[String(JSON.parse(elm).symbol)] = String(
        JSON.parse(elm).helpText
      );
    });
  }

  // メニュー画面ヘルプウィンドウの標準高さ (lineHeight)
  let menuHelpWindowLH = 1.5;

  // ヘルプウィンドウフォントサイズ
  const menuHelpWindowFontSize = 22;

  // ヘルプウィンドウの高さを定義
  Scene_MenuBase.prototype.calcMenuHelpWindowHeight = function () {
    let height = this.calcWindowHeight(menuHelpWindowLH, false);
    if (!leftBlockLabel && !rightBlockLabel)
      height = this.calcWindowHeight(1, false);
    if (!menuHelpWindowEnable) height = 0;
    return height;
  };

  Scene_Menu.prototype.isRightInputMode = function () {
    return !leftInputMode;
  };

  Scene_MenuBase.prototype.createCancelButton = function () {
    this._cancelButton = new Sprite_Button("cancel");
    this._cancelButton.x = leftInputMode
      ? 4
      : Graphics.boxWidth - this._cancelButton.width - 4;
    this._cancelButton.y = this.buttonY();
    this.addWindow(this._cancelButton);
  };

  Scene_MenuBase.prototype.createPageButtons = function () {
    this._pageupButton = new Sprite_Button("pageup");
    this._pagedownButton = new Sprite_Button("pagedown");
    if (leftInputMode) {
      this._pageupButton.x =
        Graphics.boxWidth -
        this._pageupButton.width -
        this._pagedownButton.width -
        8;
    } else {
      this._pageupButton.x = 4;
    }
    this._pageupButton.y = this.buttonY();
    const pageupRight = this._pageupButton.x + this._pageupButton.width;
    this._pagedownButton.x = pageupRight + 4;
    this._pagedownButton.y = this.buttonY();
    this.addWindow(this._pageupButton);
    this.addWindow(this._pagedownButton);
    this._pageupButton.setClickHandler(this.previousActor.bind(this));
    this._pagedownButton.setClickHandler(this.nextActor.bind(this));
  };

  const _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function () {
    _Scene_Menu_create.apply(this, arguments);
    this.createMenuHelpWindow();
    if (menuHelpWindowEnable) {
      this._goldWindow.visible = false;
      this._commandWindow.height += this.goldWindowRect().height;
    }
  };

  Scene_Menu.prototype.commandWindowRect = function () {
    const ww = this.mainCommandWidth();
    const wh =
      this.mainAreaHeight() -
      this.menuHelpWindowRect().height -
      this.goldWindowRect().height;
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = this.mainAreaTop() + this.menuHelpWindowRect().height;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Menu.prototype.goldWindowRect = function () {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = this.mainAreaBottom() - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Menu.prototype.statusWindowRect = function () {
    const ww = Graphics.boxWidth - this.mainCommandWidth();
    const wh = this.mainAreaHeight() - this.menuHelpWindowRect().height;
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = this.mainAreaTop() + this.menuHelpWindowRect().height;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Menu.prototype.createMenuHelpWindow = function () {
    const rect = this.menuHelpWindowRect();
    this._menuHelpWindow = new Window_MenuHelp(rect);
    this.addWindow(this._menuHelpWindow);
  };

  Scene_Menu.prototype.menuHelpWindowRect = function () {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcMenuHelpWindowHeight();
    return new Rectangle(wx, wy, ww, wh);
  };

  const _Scene_Menu_update = Scene_Menu.prototype.update;
  Scene_Menu.prototype.update = function () {
    _Scene_Menu_update.apply(this, arguments);
    // インフォメーションウィンドウの更新
    const helpText = menuHelpLists[this._commandWindow.currentName()]
      ? menuHelpLists[this._commandWindow.currentName()]
      : "";
    this._menuHelpWindow.setText(helpText);
  };

  Scene_ItemBase.prototype.actorWindowRect = function () {
    const wx = 0;
    const wy = Math.min(this.mainAreaTop(), this.helpAreaTop());
    const ww = Graphics.boxWidth - this.mainCommandWidth();
    const wh =
      Graphics.boxHeight -
      this.buttonAreaHeight() -
      this.calcMenuHelpWindowHeight();
    return new Rectangle(wx, wy, ww, wh);
  };

  // Get Current Name
  Window_Command.prototype.currentName = function () {
    return this.currentData() ? this.currentData().name : null;
  };

  // ウィンドウ内に立ち絵を描画
  Window_Base.prototype.drawStandingPicture = function (
    pictureName,
    x,
    y,
    width,
    height,
    sx,
    sy,
    scaleX,
    scaleY
  ) {
    width = width || 200;
    height = height || 200;
    sx = sx || 0;
    sy = sy || 0;
    const bitmap = ImageManager.loadPicture(pictureName);
    const pw = width;
    const ph = height;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const dw = Math.min(width, pw);
    const dh = Math.min(height, ph);
    this.contents.blt(bitmap, sx, sy, sw / scaleX, sh / scaleY, dx, dy, dw, dh);
  };

  Window_StatusBase.prototype.exDrawActorSimpleStatus = function (actor, x, y) {
    const lineHeight = this.lineHeight();
    if (actorNameLH > -1)
      this.drawActorName(actor, x, y + lineHeight * actorNameLH);
    if (actorLevelLH > -1)
      this.drawActorLevel(actor, x, y + lineHeight * actorLevelLH);
    if (actorIconLH > -1)
      this.drawActorIcons(actor, x, y + lineHeight * actorIconLH);
    if (actorClassLH > -1)
      this.drawActorClass(actor, x, y + lineHeight * actorClassLH);
    if (actorGaugeLH > -1)
      this.placeBasicGauges(actor, x, y + lineHeight * actorGaugeLH);
  };

  Window_MenuStatus.prototype.drawItemImage = function (index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);

    this.changePaintOpacity(actor.isBattleMember());
    // 立ち絵 or 顔グラフィック描画
    let mPicture = ExMenuScreenBase.getImageName(actor._actorId);
    if (mPicture) {
      const width = rect.width - 2;
      const height = rect.height - 2;
      const x = rect.x + 1;
      const y = rect.y + 1;
      const sx = (Number(mPicture.x) + menuWindowPictureX) * -1;
      const sy = (Number(mPicture.y) + menuWindowPictureY) * -1;
      let scaleX = Number(mPicture.scaleX) / 100;
      let scaleY = Number(mPicture.scaleY) / 100;
      // 拡大率を適用
      scaleX *= menuWindowPictureScale / 100;
      scaleY *= menuWindowPictureScale / 100;
      // ピンチ判定
      if (
        ExMenuScreenBase.getHpRate(actor._actorId) >
          Number(mPicture.pinchPercentage) ||
        !mPicture.pinchImageName
      ) {
        // 通常
        this.drawStandingPicture(
          String(mPicture.imageName),
          x,
          y,
          width,
          height,
          sx,
          sy,
          scaleX,
          scaleY
        );
      } else {
        // ピンチ
        this.drawStandingPicture(
          String(mPicture.pinchImageName),
          x,
          y,
          width,
          height,
          sx,
          sy,
          scaleX,
          scaleY
        );
      }
    } else {
      const width = ImageManager.faceWidth;
      const height = rect.height - 2;
      const x = rect.x + rect.width - width - 1;
      const y = rect.y + 1;
      this.drawActorFace(actor, x, y, width, height);
    }
    this.changePaintOpacity(true);
  };

  Window_MenuStatus.prototype.drawItemStatus = function (index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const x = rect.x + 2;
    const y = rect.y + 2;
    this.exDrawActorSimpleStatus(actor, x, y);
  };

  Window_MenuStatus.prototype.numVisibleRows = function () {
    return numVisibleRows;
  };

  Window_MenuStatus.prototype.maxCols = function () {
    return maxCols;
  };

  Window_MenuStatus.prototype.drawActorLevel = function (actor, x, y) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + lvPadding, y, 36, "right");
  };

  //-----------------------------------------------------------------------------
  // Window_MenuHelp
  //

  function Window_MenuHelp() {
    this.initialize(...arguments);
  }

  Window_MenuHelp.prototype = Object.create(Window_Base.prototype);
  Window_MenuHelp.prototype.constructor = Window_MenuHelp;

  Window_MenuHelp.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.refresh();
  };

  Window_MenuHelp.prototype.setText = function (text) {
    this._text = text;
    this.refresh();
  };

  Window_MenuHelp.prototype.clear = function () {
    this.setText("");
  };

  Window_MenuHelp.prototype.refresh = function () {
    this.contents.clear();
    this.contents.fontSize = this.getFontSize();
    // マップ名
    this.drawLeftBlock();
    // プレイ時間
    this.drawRightBlock();
    // 所持金
    this.drawCurrency();
    // メニューヘルプ
    this.drawMenuHelp();
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_MenuHelp.prototype.getFontSize = function () {
    return !leftBlockLabel && !rightBlockLabel
      ? $gameSystem.mainFontSize()
      : menuHelpWindowFontSize;
  };

  Window_MenuHelp.prototype.drawLeftBlock = function () {
    if (!leftBlockLabel) return;
    const y = -6;
    const oneThirdWidth = Math.floor(this.innerWidth / 3);
    this.changeTextColor(this.systemColor());
    this.drawText(
      leftBlockLabel,
      0,
      y,
      this.getFontSize() * leftBlockLabel.length,
      leftBlockAlign
    );
    this.resetTextColor();
    this.drawText(
      eval(leftBlockValue),
      this.getFontSize() * leftBlockLabel.length,
      y,
      oneThirdWidth * 2 - this.getFontSize() * leftBlockLabel.length,
      leftBlockAlign
    );
  };

  Window_MenuHelp.prototype.drawRightBlock = function () {
    if (!rightBlockLabel) return;
    const y = -6;
    const oneThirdWidth = Math.floor(this.innerWidth / 3);
    this.changeTextColor(this.systemColor());
    this.drawText(
      rightBlockLabel,
      oneThirdWidth * 2,
      y,
      this.getFontSize() * rightBlockLabel.length,
      rightBlockAlign
    );
    this.resetTextColor();
    this.drawText(
      eval(rightBlockValue),
      this.getFontSize() * rightBlockLabel.length + oneThirdWidth * 2,
      y,
      oneThirdWidth - this.getFontSize() * rightBlockLabel.length,
      rightBlockAlign
    );
  };

  Window_MenuHelp.prototype.drawCurrency = function () {
    const y = !leftBlockLabel && !rightBlockLabel ? 0 : 24;
    const oneThirdWidth = Math.floor(this.innerWidth / 3);
    const currencyUnit = TextManager.currencyUnit;
    const fontSize = this.getFontSize();
    this.drawCurrencyValue(
      $gameParty.gold(),
      currencyUnit,
      oneThirdWidth * 2 + fontSize * 3,
      y,
      oneThirdWidth - fontSize * 3
    );
  };

  Window_MenuHelp.prototype.drawMenuHelp = function () {
    const y = !leftBlockLabel && !rightBlockLabel ? 0 : 24;
    const oneThirdWidth = Math.floor(this.innerWidth / 3);
    this.resetTextColor();
    this.drawText(
      this._text ? this._text : "",
      0,
      y,
      this.innerWidth - oneThirdWidth
    );
  };
})();
