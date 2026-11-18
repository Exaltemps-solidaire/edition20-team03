import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois mes ressources et le parcours recommandé", async () => {
    await expect(page.getByRole("heading", { name: "Vos ressources" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Les parcours" })).toBeVisible();
    await expect(page.getByText("Recommandé pour vous")).toBeVisible();
  });
});
