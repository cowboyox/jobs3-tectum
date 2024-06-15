import { useEffect } from 'react';

const useDropdown = () => {
  useEffect(() => {
    const handleDropdown = () => {
      const button_triggers = document.querySelectorAll('.button_dropdown .button_trigger');
      const all_button_containers = document.querySelectorAll('.button_dropdown');

      button_triggers.forEach((button_trigger) => {
        button_trigger.addEventListener('click', () => {
          const dropdown_container = button_trigger.closest('.button_dropdown');
          all_button_containers.forEach((willRemoveActive) => {
            if (willRemoveActive !== dropdown_container) {
              willRemoveActive.classList.remove('open');
            }
          });
          dropdown_container.classList.toggle('open');
        });
      });

      const dropdown_options = document.querySelectorAll(
        '.button_dropdown .button_dropdown_content .dropdown_option'
      );
      dropdown_options.forEach((btn_option) => {
        btn_option.addEventListener('click', () => {
          const current_dropdown_container = btn_option.closest('.button_dropdown');
          const current_dropdown_options =
            current_dropdown_container.querySelectorAll('.dropdown_option');
          current_dropdown_options.forEach((will_remove_choosen) => {
            will_remove_choosen.classList.remove('choosen_option');
          });
          btn_option.classList.add('choosen_option');

          const corresponding_control = btn_option
            .closest('.button_dropdown')
            .querySelector('.button_trigger span');
          if (corresponding_control && btn_option.textContent) {
            corresponding_control.innerHTML = btn_option.textContent;
          }
        });
      });
    };

    handleDropdown();

    return () => {
      const button_triggers = document.querySelectorAll('.button_dropdown .button_trigger');
      const dropdown_options = document.querySelectorAll(
        '.button_dropdown .button_dropdown_content .dropdown_option'
      );

      button_triggers.forEach((button_trigger) => {
        button_trigger.removeEventListener('click', handleDropdown);
      });

      dropdown_options.forEach((btn_option) => {
        btn_option.removeEventListener('click', handleDropdown);
      });
    };
  }, []);
};

export default useDropdown;
