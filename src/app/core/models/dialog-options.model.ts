export enum Dialog {
    ConfirmationDialogComponent = 'ConfirmationDialogComponent',
    MemberDialogComponent = 'MemberDialogComponent',
    CardComponent = 'CardComponent'
}

export interface DialogOptions {
    type?: Dialog;
    content?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: (email?: string) => void;
    onCancel?: () => void;
}
