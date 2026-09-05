let isSubmitting = false;
let requestFailed = false;
let retryCount = 0;
let buttonDisabled = false;

async function submitForm() {
  if (buttonDisabled) return;

  isSubmitting = true;
  buttonDisabled = true;
  updateButton();

  try {
    await fakeRequest();

    requestFailed = false;
    retryCount = 0;
  } catch (error) {
    requestFailed = true;
    retryCount++;

    if (retryCount < 3) {
      buttonDisabled = false;
    }

    console.error("submission failed", error);
  }

  if (!requestFailed) {
    isSubmitting = false;
  }

  if (requestFailed && retryCount >= 3) {
    buttonDisabled = false;
    isSubmitting = false;
  }

  updateButton();
}

function updateButton() {
  console.log({
    isSubmitting,
    requestFailed,
    retryCount,
    buttonDisabled
  });
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