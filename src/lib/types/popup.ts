import { Json } from '@/lib/types/supabase';

export interface ToastContent extends Record<string, Json | undefined> {
  title: string;
  description: string;
  link?: string;
  imageName?: string;
  timeLimit: boolean;
  position: 'top' | 'bottom';
}

export interface BasicPopupContent extends Record<string, Json | undefined> {
  title: string;
  description: string;
  imageName?: string;
  button: {
    label: string;
    link: string;
    timeLimit: boolean;
  };
}

export interface MacWindowPopupContent extends Record<string, Json | undefined> {
  title: string;
  imageName?: string;
  link?: string;
}

export type PopupContent = ToastContent | BasicPopupContent | MacWindowPopupContent;

export type JsonCompatiblePopupContent = PopupContent;

export interface PopupData {
  id?: string;
  website_id: string;
  popup_type: 'toast' | 'basicPopup' | 'macWindowPopup';
  content: JsonCompatiblePopupContent;
  path?: string | null;
  wait_for: number;
  duration?: number;
  frequency: number;
  created_at?: string;
}
