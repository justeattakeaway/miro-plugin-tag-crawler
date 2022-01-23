import config from "./config";
import { IMeta } from "./types";

export async function clearLines() {
  const allLines = await miro.board.widgets.get({ type: "line" });
  const tagCrawlerLines = allLines.filter((l) => (l.metadata[config.clientId] as IMeta)?.isTagCrawlerLine);

  console.log("Clearing lines", { count: tagCrawlerLines.length });
  for (let lineWidget of tagCrawlerLines) {
    await miro.board.widgets.deleteById(lineWidget.id);
  }
  console.log("Cleared lines");
}

export async function getWidgetTags(widgetId: string) {
  const tags = await miro.board.tags.get();
  return tags.filter((t) => t.widgetIds.includes(widgetId)).filter((t) => !t.title.startsWith("."));
}

export const colors = ["yellow", "green", "red", "blue", "black"];
export const colorMap: { [key: string]: string } = {
  yellow: "ffd02f",
  green: "77cc66",
  red: "e15454",
  blue: "4262ff",
  black: "000000",
};
