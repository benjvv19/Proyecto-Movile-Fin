import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.page.html',
  styleUrls: ['./adminproductos.page.scss'],
})
export class AdminproductosPage implements OnInit {
  
  arregloZapatillas: any[]=[
    {
      id: 1,
      descripcion: '¡Domina la cancha con estilo con las zapatillas adidas Breaknet Junior para niños! Diseñadas para los jóvenes atletas que buscan comodidad y rendimiento, estas zapatillas combinan la calidad emblemática de adidas con un diseño moderno y llamativo. Confeccionadas con una parte superior de cuero sintético y una suela de goma duradera, las Breaknet brindan estabilidad y tracción en cada movimiento. Ya sea en la cancha o en la calle, estas zapatillas son la elección perfecta para destacar en cualquier situación. ¡Haz que tu juego hable por sí mismo con las zapatillas adidas Breaknet Junior!',
      tipo: 'niño',
      imagen: 'https://i.postimg.cc/hjPVd5nd/adidas-breaknet-nino.webp',
      marca: 'ADIDAS',
      nombre:'ZAPATILLAS ADIDAS BREAKNET JUNIOR HOMBRE',
      precio: 41.999
    },
    {
        id: 2,
        descripcion: '¡Prepárate para conquistar la cancha con las zapatillas adidas Hoops 3.0 para niños! Estas zapatillas combinan el estilo urbano con la calidad y el rendimiento de adidas. Con su diseño moderno y colores llamativos, las Hoops 3.0 son perfectas para destacar en la cancha o en la calle. Su construcción resistente y la amortiguación superior proporcionan comodidad y soporte durante todo el día. ¡Haz que cada paso cuente con las zapatillas adidas Hoops 3.0 y lleva tu juego al siguiente nivel!',
        tipo: 'niño',
        imagen: 'https://i.postimg.cc/Wpy0d8Hd/adidas-hoops-nino.webp',
        marca: 'ADIDAS',
        nombre:'ZAPATILLAS ADIDAS HOOPS 3.0',
        precio: 54.999
    },
    {
        id: 3,
        descripcion: '¡Prepárate para marcar la diferencia en el juego con las zapatillas adidas Hoops 2.0 para niños! Estas zapatillas combinan el estilo deportivo con un toque de modernidad urbana. Con su diseño dinámico y colores vibrantes, las Hoops 2.0 son ideales para destacar en la cancha o en la calle. Su construcción ligera y la amortiguación superior ofrecen comodidad y soporte en cada paso. ¡Haz que tu estilo destaque con las zapatillas adidas Hoops 2.0 y prepárate para brillar en cualquier lugar!',
        tipo: 'niño',
        imagen: 'https://i.postimg.cc/m2FCC9v8/adidas-hoops-nino2.webp',
        marca: 'ADIDAS',
        nombre:'ZAPATILLAS ADIDAS HOOPS 2.0',
        precio: 66.999
    },
    {
        id: 4,
        descripcion: '¡Prepárate para brillar en la cancha con las zapatillas adidas Hoops 3.0 blancas para niños! Diseñadas para los pequeños que aman el deporte y el estilo, estas zapatillas combinan la emblemática calidad de adidas con un toque de frescura urbana. Confeccionadas con materiales de primera calidad y una suela resistente, las Hoops 3.0 brindan comodidad y durabilidad para horas de juego. Ya sea en la cancha o en la calle, estos zapatos serán el complemento perfecto para cualquier aventura. ¡Haz que tus pasos destaquen con las zapatillas adidas Hoops 3.0!',
        tipo: 'niño',
        imagen: 'https://i.postimg.cc/13h6HtPP/adidas-hoops-nino3.webp',
        marca: 'ADIDAS',
        nombre:'ZAPATILLAS ADIDAS HOOPS 3.0 BLANCA',
        precio: 32.999
    },
    {
        id: 5,
        descripcion: '¡Haz que tus pequeños destaquen con actitud con las zapatillas Puma Karmen Rebelle! Estas zapatillas fusionan el estilo urbano con un toque de rebeldía, perfecto para los jóvenes que quieren marcar tendencia. Con su diseño moderno y detalles llamativos, las Karmen Rebelle son el complemento perfecto para cualquier outfit. Su construcción resistente y la amortiguación superior ofrecen comodidad y soporte en cada paso. ¡Deja que tus pequeños expresen su personalidad con las zapatillas Puma Karmen Rebelle y sé testigo de cómo se destacan en estilo y actitud!',
        tipo: 'niño',
        imagen: 'https://i.postimg.cc/JhKkM5X4/puma-karmen-nino.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS PUMA KARMEN REBELLE',
        precio: 31.999
    },
    {
        id: 6,
        descripcion: '¡Prepárate para la aventura con las zapatillas Puma Paw Patrol infantiles en azul! Inspiradas en los valientes cachorros de la Patrulla Canina, estas zapatillas son el sueño de todo pequeño aventurero. Con un diseño vibrante y divertido, estas zapatillas añaden un toque de diversión a cada paso. Su construcción resistente y la suela de goma proporcionan comodidad y tracción en todas las aventuras. ¡Deja que tus pequeños se unan a la Patrulla Canina y destaquen con estilo en estas zapatillas Puma!',
        tipo: 'niño',
        imagen: 'https://i.postimg.cc/k4pRtMw0/puma-paw-nino.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS PUMA PAW PATROL INFANTIL AZUL',
        precio: 70.999
    },
    {
        id: 7,
        descripcion: '¡Eleva su estilo y juego con las zapatillas Puma Rebound V6 Mid para niños! Estas zapatillas ofrecen un diseño moderno y dinámico que combina comodidad y rendimiento a la perfección. Con su parte superior de cuero sintético duradero y su suela de goma resistente, las Rebound V6 Mid proporcionan estabilidad y tracción en cada paso. Ya sea en la cancha o en la calle, estas zapatillas serán el complemento perfecto para cualquier aventura. ¡Haz que tus pequeños destaquen con estilo con las zapatillas Puma Rebound V6 Mid!',
        tipo: 'niño',
        imagen: 'https://i.postimg.cc/zD4psq52/puma-rebound-nino.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS PUMA REBOUND V6 MID',
        precio: 50.999
    },
    {
        id: 8,
        descripcion: '¡Prepárate para elevar su estilo y juego con las zapatillas Puma Rebound V6 para niños! Estas zapatillas combinan un diseño moderno y deportivo con la calidad y comodidad que caracteriza a Puma. Confeccionadas con materiales duraderos y una suela resistente, las Rebound V6 brindan estabilidad y tracción en cada movimiento. Ya sea en la cancha o en la calle, estas zapatillas son ideales para acompañar a tus pequeños en todas sus aventuras. ¡Haz que destaquen con estilo con las zapatillas Puma Rebound V6!',
        tipo: 'niño',
        imagen: 'https://i.postimg.cc/sfMwHMFZ/puma-reboud-nino.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS PUMA REBOUND V6',
        precio: 44.999
    },
    

    {
        id: 9,
        descripcion: ' Domina tu carrera con las zapatillas Adidas Racer TR21 para hombre. Diseñadas para los corredores que buscan velocidad y comodidad, estas zapatillas combinan estilo y rendimiento a la perfección.',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/d0F2q0Sn/adidad-3.webp',
        marca: 'ADIDAS',
        nombre:'ZAPATILLA ADIDAS RACER TR21 HOMBRE',
        precio: 60.999
    },
    {
        id: 10,
        descripcion: ' ¡Eleva tu estilo urbano con las Zapatillas Adidas Hoops 3.0 para Hombre en Blanco! Diseñadas para combinar comodidad y modernidad, estas zapatillas son un símbolo de estilo deportivo y sofisticado.',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/1XbFbRqG/ADIDAS-BLANCA.webp',
        marca: 'ADIDAS',
        nombre:'ZAPATILLAS ADIDAS HOOPS 3.0  BLANCO',
        precio: 63.999
    },
    {
        id: 11,
        descripcion: ' ¡Eleva tu estilo urbano con las Zapatillas Adidas Hoops 3.0 para Hombre en Negras! Diseñadas para combinar comodidad y modernidad, estas zapatillas son un símbolo de estilo deportivo y sofisticado.',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/KY5n4y6b/adidas-1.webp',
        marca: 'ADIDAS',
        nombre:'ZAPATILLAS ADIDAS HOOPS 3.0 HOMBRE',
        precio: 78.999
    },
    {
        id: 12,
        descripcion: '¡Explora la naturaleza con confianza con las zapatillas Adidas Terrex! Diseñadas para los amantes del aire libre y los aventureros, estas zapatillas son tu compañero ideal en cualquier terreno. ',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/mDXCNyZ6/ADIDAS-TTR.webp',
        marca: 'ADIDAS',
        nombre:'ZAPATILLAS ADIDAS TERREX EASTRAIL HOMBRE',
        precio: 45.990
    },
    {
        id: 13,
        descripcion: 'Dale a tus pasos un toque de estilo con las Zapatillas Vans. Con su diseño clásico y versátil, estas zapatillas Vans Knud Mid Unisex en color negras son la combinación perfecta de comodidad y moda.',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/VkWR0Mt2/vans-baja.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS KNU MID HOMBRE',
        precio: 69.999
    },
    {
        id: 14,
        descripcion: 'Dale a tus pasos un toque de estilo con las Zapatillas Vans. Con su diseño clásico y versátil, estas zapatillas Sk8-Low Unisex en color negro son la combinación perfecta de comodidad y moda.',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/yN6TmdXx/vans-cana.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS SK8-HI HOMBRE',
        precio: 50.999
    },
    {
        id: 15,
        descripcion: ' Dale a tus pasos un toque de estilo con las Zapatillas Vans. Con su diseño clásico y versátil, estas zapatillas Vans Rowley Unisex en color negro son la combinación perfecta de comodidad y moda.',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/8zS4Cw7h/vans-44.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS ROWLEY NEGRAS HOMBRE',
        precio: 59.999
    },
    {
        id: 16,
        descripcion: ' Dale a tus pasos un toque de estilo con las Zapatillas Vans. Con su diseño clásico y versátil, estas zapatillas Vans Rowley Unisex en color blancas son la combinación perfecta de comodidad y moda.',
        tipo: 'hombre',
        imagen: 'https://i.postimg.cc/fbHfBNBK/VANS-BLANCA.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS ROWLEY BEIGE HOMBRE',
        precio: 70.999
    },
    
    {
        id: 17,
        descripcion: '¡Deslumbra con estilo en cada paso con las zapatillas Puma Cali Canvas para mujeres! Estas zapatillas capturan la esencia del estilo californiano con un toque moderno y femenino. Confeccionadas en lona resistente y ligera, las Cali Canvas ofrecen comodidad durante todo el día y un look fresco y versátil. Su diseño inspirado en el pasado, pero con un giro contemporáneo, las convierte en el complemento perfecto para cualquier outfit casual o deportivo. ¡Eleva tu estilo con las zapatillas Puma Cali Canvas y haz que todas las miradas se centren en ti!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/qvsKZTMK/puma-cali-rosada.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS PUMA CALI CANVAS MUJER',
        precio: 61.999
    },
    {
        id: 18,
        descripcion: '¡Haz que tus pasos sean una declaración de estilo con las zapatillas Puma Caven 2.0 para mujeres! Estas zapatillas combinan a la perfección la moda urbana con el confort deportivo. Con su diseño moderno y aerodinámico, las Caven 2.0 añaden un toque de sofisticación a cualquier look. Su construcción ligera y la amortiguación superior te brindan una sensación de comodidad que te acompañará todo el día. Desde la calle hasta el gimnasio, estas zapatillas te llevarán con estilo a donde quiera que vayas. ¡Destaca con las zapatillas Puma Caven 2.0 y marca tendencia en cada paso!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/1zyqkjfj/puma-caven-blanca.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS PUMA CAVEN 2.0 MUJER',
        precio: 86.999
    },
    {
        id: 19,
        descripcion: '¡Desata tu rebeldía con las zapatillas Karmen Rebelle para mujeres! Estas zapatillas encarnan el espíritu audaz y la elegancia urbana. Con un diseño vanguardista y detalles llamativos, las Karmen Rebelle son el complemento perfecto para aquellas que desean destacar en cada paso que dan. Su construcción robusta y su estilo único te brindan confianza y comodidad durante todo el día, ya sea en la ciudad o en la pista de baile. ¡Haz una declaración de moda y empodérate con las zapatillas Karmen Rebelle!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/855r5fdd/puma-karmen-rosada.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS KARMEN REBELLE MUJER',
        precio: 47.999
    },
    {
        id: 20,
        descripcion: '¡Destaca con estilo con las zapatillas Puma RBD para mujeres! Estas zapatillas fusionan la elegancia y el rendimiento en un diseño único y llamativo. Con detalles inspirados en la moda urbana y la innovación deportiva, las Puma RBD son el complemento perfecto para cualquier ocasión. Su construcción de alta calidad y su amortiguación superior te brindan comodidad y soporte durante todo el día. Desde la calle hasta el gimnasio, estas zapatillas te llevarán con estilo a donde quiera que vayas. ¡Haz una declaración de moda con las zapatillas Puma RBD y marca tendencia con cada paso!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/hhFJpCkM/PUMA-RBD.webp',
        marca: 'PUMA',
        nombre:'ZAPATILLAS PUMA RBD MUJER',
        precio: 77.999
    },
    {
        id: 21,
        descripcion: '¡Prepárate para deslumbrar con las zapatillas Vans KNU para mujeres! Estas zapatillas fusionan el estilo contemporáneo con la esencia clásica de Vans. Con detalles únicos y una silueta moderna, las Vans KNU son el complemento perfecto para tu estilo audaz y lleno de personalidad. Desde la calle hasta la pista de baile, estas zapatillas te llevarán a otro nivel de moda y comodidad. ¡Marca tendencia y haz una declaración de moda con las Vans KNU!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/DZ8dNMNK/vans-knu-mujer.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS KNU MUJER',
        precio: 90.999
    },
    {
        id: 22,
        descripcion: '¡Prepárate para elevar tu estilo con las icónicas zapatillas Vans Old Skool para mujeres! Con su diseño clásico, estas zapatillas son el epítome del chic urbano con un toque de rebeldía. Desde las calles hasta las pasarelas, destacarás con su comodidad y estilo sin igual. ¡Haz una declaración audaz con cada paso que des con las Vans Old Skool!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/FR8gXxtk/vans-old2-mujer.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS OLD SKOOL MUJER',
        precio: 63.999
    },
    {
        id: 23,
        descripcion: '¡Descubre el poder del estilo atemporal con las zapatillas Vans Old Skool para mujeres! Con su diseño clásico y la legendaria franja lateral, estas zapatillas te llevan desde la acera hasta la pasarela con un toque de audacia y feminidad. Su comodidad y versatilidad las convierten en el complemento perfecto para tu estilo de vida activo y lleno de energía. ¡Pisa fuerte y destaca con cada paso gracias a las Vans Old Skool!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/T1bjdWG7/vans-old-mujer.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS OLD SKOOL STACKFORM MUJER',
        precio: 41.999
    },
    {
        id: 24,
        descripcion: '¡Haz que tus pasos destaquen con las zapatillas Vans SK8 para mujeres! Estas zapatillas fusionan el legado del skate con un estilo único y femenino. Con su distintivo diseño de caña alta y la clásica franja lateral de Vans, las SK8 son un símbolo de audacia y autenticidad. Ya sea en la calle o en el parque de patinaje, estas zapatillas te brindan el equilibrio perfecto entre moda y funcionalidad. ¡Únete a la revolución del estilo urbano con las zapatillas Vans SK8!',
        tipo: 'mujer',
        imagen: 'https://i.postimg.cc/bYS9H4bx/VANS-SK8-MUJER.webp',
        marca: 'VANS',
        nombre:'ZAPATILLAS VANS SK8 MUJER',
        precio: 81.999
    }
  ]

  constructor(private router: Router) { }

  verDetalles(id: number) {
    this.router.navigate(['/admindetalles', id]);
  }

  ngOnInit() {
  }

}
