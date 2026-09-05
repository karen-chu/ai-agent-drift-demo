let isSubmitting = false;

async function submitForm() {
  if (isSubmitting) return;

  isSubmitting = true;
  updateButton();

  try {
    await fakeRequest();
    console.log("submitted successfully");
  } catch (error) {
    console.error("submission failed", error);
  } finally {
    isSubmitting = false;
    updateButton();
  }
}

function updateButton() {
  console.log(isSubmitting ? "button disabled" : "button enabled");
}

function fakeRequest(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve()
        : reject(new Error("network error"));
    }, 1000);
  });
}

submitForm();
export {};