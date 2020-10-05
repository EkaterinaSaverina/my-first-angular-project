export enum Dialog {
    DialogComponent = 'DialogComponent',
    CardComponent = 'CardComponent'
}

export interface DialogOptions {
    type?: Dialog;
    content?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}
