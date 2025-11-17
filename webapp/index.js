document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valForm');
    const xButtons = document.querySelectorAll('.x-btn');
    const xHiddenInput = document.getElementById('x');
    const yInput = document.getElementById('yInput');
    const rCheckboxes = document.querySelectorAll('input[name="r"]');

    let selectedX = null;

    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-container';
    form.parentNode.insertBefore(errorContainer, form);

    function showError(message) {
        errorContainer.innerHTML = `<strong>Ошибки:</strong><br>${message}`;
        errorContainer.style.display = 'block';
    }

    function hideError() {
        errorContainer.style.display = 'none';
    }


    function normalizeNumber(input) {
        return input.replace(',', '.');
    }



    xButtons.forEach(button => {
        button.addEventListener('click', function() {
            xButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedX = this.getAttribute('data-value');
            xHiddenInput.value = selectedX;
            hideError();
        });
    });

    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                rCheckboxes.forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
                hideError();
            }
        });
    });

    form.addEventListener('submit', function(event) {
        let isValid = true;
        let errorMessage = '';

        if (!selectedX) {
            isValid = false;
            errorMessage += 'Выберите значение X<br>';
        }

        const yValue = yInput.value.trim();
        if (!yValue) {
            isValid = false;
            errorMessage += 'Введите значение Y<br>';
        } else {

            const normalizedY = normalizeNumber(yValue);
            const yNum = parseFloat(normalizedY);

            if (isNaN(yNum)) {
                isValid = false;
                errorMessage += 'Y должно быть числом<br>';
            } else if (yNum < -5 || yNum > 5) {
                isValid = false;
                errorMessage += 'Y должно быть от -5 до 5<br>';
            } else {

                yInput.value = normalizedY;
            }
        }

        const rChecked = document.querySelector('input[name="r"]:checked');
        if (!rChecked) {
            isValid = false;
            errorMessage += 'Выберите значение R<br>';
        }

        if (!isValid) {
            event.preventDefault();
            showError(errorMessage);
        }
    });


    document.getElementById('formReset').addEventListener('click', function() {
        selectedX = null;
        xHiddenInput.value = '';
        yInput.value = '';
        xButtons.forEach(btn => btn.classList.remove('selected'));
        rCheckboxes.forEach(cb => cb.checked = false);
        hideError();
    });
});
