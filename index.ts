import { clearLines, colorMap, getWidgetTags } from "./common";
import config from "./config";
import icons from "./icons";
import { IMeta } from "./types";

miro.onReady(async () => {
  await clearLines();

  miro.addListener("SELECTION_UPDATED", async (widget) => {
    await clearLines();

    const enabled = localStorage.getItem(config.storageKeys.settings.miroPluginTagCrawlerEnabled) === "true";
    if (!enabled) {
      return;
    }

    if (widget.data.length !== 1) return;

    const selectedWidget = widget.data[0];
    const widgetTags = await getWidgetTags(selectedWidget.id);

    const alreadyLinked: string[] = [];
    const lineWidgets: SDK.WidgetToBeCreated[] = [];

    for (let widgetTag of widgetTags) {
      const otherWidgetIds = widgetTag.widgetIds.filter((id) => id !== selectedWidget.id);

      for (let otherWidgetId of otherWidgetIds) {
        if (alreadyLinked.includes(otherWidgetId)) continue;
        alreadyLinked.push(otherWidgetId);

        const otherWidget = await miro.board.widgets.get({ id: otherWidgetId });
        if (otherWidget.length < 1) continue;

        const storedColor = localStorage.getItem(config.storageKeys.settings.miroPluginTagCrawlerColor);
        const lineColor = storedColor === "multi" ? widgetTag.color : `#${colorMap[storedColor]}`;

        lineWidgets.push({
          type: "LINE",
          startWidgetId: selectedWidget.id,
          endWidgetId: otherWidgetId,
          captions: [{ text: widgetTag.title }],
          metadata: {
            [config.clientId]: {
              isTagCrawlerLine: true,
            } as IMeta,
          },
          style: {
            lineColor,
            lineEndStyle: miro.enums.lineArrowheadStyle.NONE,
            lineStartStyle: miro.enums.lineArrowheadStyle.NONE,
            lineStyle: miro.enums.lineStyle.NORMAL,
            lineThickness: 2,
            lineType: miro.enums.lineType.ARROW,
          },
        });
      }
    }

    await miro.board.widgets.create(lineWidgets);
  });

  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: "Tag crawler",
        svgIcon: icons.tag_crawler,
        onClick: async () => {
          miro.board.ui.openLeftSidebar("sidebar.html");
        },
      },
    },
  });
});
