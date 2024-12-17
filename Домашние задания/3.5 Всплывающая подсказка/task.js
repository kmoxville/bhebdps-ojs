(() => {

    const tooltips = document.querySelectorAll('.has-tooltip');
    const tooltip = document.createElement('div');
    const MARGIN = 10;
    
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);

    tooltips.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            if (tooltip.classList.contains('tooltip_active')) {
                tooltip.classList.remove('tooltip_active');
            }

            const tooltipText = trigger.getAttribute('title');
            tooltip.textContent = tooltipText;

            const rect = trigger.getBoundingClientRect();
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.bottom + MARGIN}px`;
            tooltip.classList.add('tooltip_active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!tooltip.contains(e.target) && !e.target.classList.contains('has-tooltip')) {
            tooltip.classList.remove('tooltip_active');
        }
    });

  })();