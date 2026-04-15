import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { sessionId, productId, quantity } = await request.json();

    // 查找购物车
    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });

    if (!cart) {
      // 创建新购物车
      cart = await prisma.cart.create({
        data: { sessionId },
        include: { items: true },
      });
    }

    // 查找购物车项
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (cartItem) {
      // 更新数量
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
      return NextResponse.json(updatedCartItem);
    } else {
      // 创建新购物车项
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
        include: { product: true },
      });
      return NextResponse.json(newCartItem);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const total = cart.items.reduce((sum, item) => sum + item.quantity * Number(item.product.price), 0);

    return NextResponse.json({
      cartId: cart.id,
      items: cart.items,
      total,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { cartId, productId, quantity } = await request.json();

    const updatedCartItem = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
      data: { quantity },
      include: { product: true },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { cartId, productId } = await request.json();

    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete cart item' }, { status: 500 });
  }
}
