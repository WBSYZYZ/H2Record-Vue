import { onMounted, onUnmounted } from 'vue';

export default function useClickOutside(ref,showAddVisible ,callback) {
    const handleClick = e => {
        if (ref.value && !ref.value.contains(e.target) && showAddVisible.value==true) {
            callback();
        }
        showAddVisible.value=true;
    };

    onMounted(() => {
        document.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
    });
}