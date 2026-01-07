import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ImagenObservacion } from '../interfaces/ali';

/**
 * Opciones de configuración para la selección de imágenes
 */
export interface OpcionesSeleccionImagen {
  maxSize?: number;           // Tamaño máximo en bytes (default: 5MB)
  accept?: string;            // Tipos de archivo aceptados (default: 'image/jpeg,image/jpg,image/png,image/gif')
  mostrarAlertas?: boolean;   // Mostrar alertas de error (default: true)
}

/**
 * Servicio reutilizable para la gestión de carga de imágenes
 * Proporciona métodos para seleccionar, validar y convertir imágenes a Base64
 */
@Injectable({
  providedIn: 'root',
})
export class ImagenUploadService {

  constructor(private alertController: AlertController) { }

  /**
   * Abre el selector de archivos y retorna la imagen seleccionada como ImagenObservacion
   * @param opciones - Configuración opcional para la selección
   * @returns Promise con ImagenObservacion o null si se cancela
   */
  async seleccionarImagen(opciones?: OpcionesSeleccionImagen): Promise<ImagenObservacion | null> {
    const config = {
      maxSize: opciones?.maxSize || 5 * 1024 * 1024, // 5MB por defecto
      accept: opciones?.accept || 'image/jpeg,image/jpg,image/png,image/gif',
      mostrarAlertas: opciones?.mostrarAlertas !== false
    };

    return new Promise((resolve) => {
      // Crear input file dinámicamente
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = config.accept;

      input.onchange = async (event: any) => {
        const file = event.target.files[0];

        if (!file) {
          resolve(null);
          return;
        }

        // Validar tipo de archivo
        if (!this.validarTipoImagen(file)) {
          if (config.mostrarAlertas) {
            await this.mostrarAlerta(
              'Archivo no válido',
              'Por favor seleccione un archivo de imagen válido (JPG, PNG, GIF)'
            );
          }
          resolve(null);
          return;
        }

        // Validar tamaño
        if (!this.validarTamanio(file, config.maxSize)) {
          if (config.mostrarAlertas) {
            const maxSizeMB = (config.maxSize / (1024 * 1024)).toFixed(1);
            await this.mostrarAlerta(
              'Archivo muy grande',
              `El tamaño máximo permitido es de ${maxSizeMB}MB`
            );
          }
          resolve(null);
          return;
        }

        try {
          // Convertir a base64
          const base64Data = await this.convertirABase64(file);

          // Crear objeto ImagenObservacion
          const imagen: ImagenObservacion = {
            nombre: file.name,
            tipo: file.type,
            tamanio: file.size,
            data: base64Data,
            fechaAdjunto: new Date().toISOString()
          };

          resolve(imagen);
        } catch (error) {
          console.error('Error al procesar la imagen:', error);
          if (config.mostrarAlertas) {
            await this.mostrarAlerta(
              'Error',
              'Ocurrió un error al procesar la imagen. Por favor intente nuevamente.'
            );
          }
          resolve(null);
        }
      };

      // Simular click para abrir selector
      input.click();
    });
  }

  /**
   * Selecciona una imagen y retorna solo el string Base64
   * Útil para casos simples donde no se necesita la metadata completa
   * @param opciones - Configuración opcional
   * @returns Promise con string Base64 o null
   */
  async seleccionarImagenBase64(opciones?: OpcionesSeleccionImagen): Promise<string | null> {
    const imagen = await this.seleccionarImagen(opciones);
    return imagen ? imagen.data : null;
  }

  /**
   * Convierte un archivo a string Base64
   * @param file - Archivo a convertir
   * @returns Promise con el string Base64
   */
  private convertirABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Valida que el archivo sea una imagen
   * @param file - Archivo a validar
   * @returns true si es una imagen válida
   */
  private validarTipoImagen(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Valida el tamaño del archivo
   * @param file - Archivo a validar
   * @param maxSize - Tamaño máximo en bytes
   * @returns true si el tamaño es válido
   */
  private validarTamanio(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  }

  /**
   * Muestra una alerta al usuario
   * @param header - Título de la alerta
   * @param message - Mensaje de la alerta
   */
  private async mostrarAlerta(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Formatea el tamaño del archivo en formato legible
   * @param bytes - Tamaño en bytes
   * @returns String formateado (ej: "1.5 MB")
   */
  formatearTamanio(bytes: number): string {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  }

  /**
   * Formatea la fecha en formato DD/MM/YYYY
   * @param fechaISO - Fecha en formato ISO string
   * @returns String formateado
   */
  formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
}
